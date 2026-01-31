import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScanningScreen = ({ onScanComplete }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Initializing scan...');
    const [components, setComponents] = useState({
        cpu: { status: 'pending', label: 'CPU', value: '', icon: '○' },
        ram: { status: 'pending', label: 'RAM', value: '', icon: '○' },
        gpu: { status: 'pending', label: 'GPU', value: '', icon: '○' },
        vram: { status: 'pending', label: 'VRAM', value: '', icon: '○' },
        storage: { status: 'pending', label: 'Storage', value: '', icon: '○' }
    });

    const updateComponent = (key, status, value = '', icon = '') => {
        setComponents(prev => ({
            ...prev,
            [key]: { ...prev[key], status, value, icon: icon || getStatusIcon(status) }
        }));
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'scanning': return '🔄';
            case 'success': return '✓';
            case 'warning': return '⚠️';
            case 'error': return '✗';
            default: return '○';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'scanning': return 'var(--accent-primary)';
            case 'success': return 'var(--accent-success)';
            case 'warning': return 'var(--accent-warning)';
            case 'error': return 'var(--accent-error)';
            default: return '#666';
        }
    };

    useEffect(() => {
        const scan = async () => {
            try {
                setProgress(5);
                setStatus('Starting hardware scan...');
                await new Promise(resolve => setTimeout(resolve, 300));

                // CPU Detection
                setProgress(15);
                setStatus('Detecting CPU...');
                updateComponent('cpu', 'scanning');

                const result = await window.electronAPI.scanSystem();

                // Handle IPC response structure { status: 'success', data: {...} }
                if (result.status !== 'success' || !result.data) {
                    throw new Error(result.message || 'Scan failed');
                }

                const systemData = result.data;

                await new Promise(resolve => setTimeout(resolve, 400));
                const cpuInfo = `${systemData.cpu.manufacturer} ${systemData.cpu.brand}`;
                updateComponent('cpu', 'success', cpuInfo);

                // RAM Detection
                setProgress(35);
                setStatus('Analyzing RAM...');
                updateComponent('ram', 'scanning');
                await new Promise(resolve => setTimeout(resolve, 400));
                const ramGB = Math.round(systemData.mem.total / (1024 * 1024 * 1024));
                updateComponent('ram', 'success', `${ramGB} GB`);

                // GPU Detection
                setProgress(55);
                setStatus('Scanning GPU...');
                updateComponent('gpu', 'scanning');
                await new Promise(resolve => setTimeout(resolve, 400));
                const gpuInfo = systemData.graphics.controllers.map(g => g.model).join(', ') || 'Integrated';
                updateComponent('gpu', 'success', gpuInfo);

                // VRAM Detection
                setProgress(70);
                setStatus('Checking VRAM...');
                updateComponent('vram', 'scanning');
                await new Promise(resolve => setTimeout(resolve, 400));
                const vramGB = Math.round(systemData.graphics.controllers.reduce((acc, gpu) => acc + (gpu.vram || 0), 0) / 1024);
                if (vramGB > 0) {
                    updateComponent('vram', 'success', `${vramGB} GB`);
                } else {
                    updateComponent('vram', 'warning', 'Unified/Shared', '⚠️');
                }

                // Storage Detection
                setProgress(85);
                setStatus('Checking storage...');
                updateComponent('storage', 'scanning');
                await new Promise(resolve => setTimeout(resolve, 400));
                const hasSSD = systemData.diskLayout.some(d => d.type === 'SSD' || d.type === 'NVMe');
                if (hasSSD) {
                    updateComponent('storage', 'success', 'SSD Detected');
                } else {
                    updateComponent('storage', 'warning', 'HDD (Slow)', '⚠️');
                }

                setProgress(100);
                setStatus('Analysis complete!');

                await new Promise(resolve => setTimeout(resolve, 800));
                onScanComplete(systemData);
            } catch (error) {
                console.error('Scan failed:', error);
                setStatus('Scan failed. Please try again.');
                updateComponent('cpu', 'error', 'Detection failed');
                updateComponent('ram', 'error', 'Detection failed');
                updateComponent('gpu', 'error', 'Detection failed');
                updateComponent('vram', 'error', 'Detection failed');
                updateComponent('storage', 'error', 'Detection failed');
            }
        };

        scan();
    }, [onScanComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card"
            style={{ padding: '3rem', maxWidth: '800px', margin: 'auto' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Hardware Scan In Progress</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{status}</p>
            </div>

            {/* Component Status Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                {Object.entries(components).map(([key, comp]) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: Object.keys(components).indexOf(key) * 0.1 }}
                        style={{
                            background: 'var(--bg-secondary)',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: `1px solid ${comp.status === 'scanning' ? 'var(--accent-primary)' : 'transparent'}`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                    >
                        <div style={{
                            fontSize: '1.5rem',
                            color: getStatusColor(comp.status),
                            minWidth: '30px',
                            textAlign: 'center'
                        }}>
                            {comp.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{
                                fontSize: '0.8rem',
                                color: '#888',
                                marginBottom: '0.2rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                {comp.label}
                            </div>
                            <div style={{
                                fontSize: '0.9rem',
                                color: getStatusColor(comp.status),
                                fontWeight: comp.value ? '500' : 'normal'
                            }}>
                                {comp.value || (comp.status === 'scanning' ? 'Detecting...' : 'Waiting...')}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Progress Bar */}
            <div style={{
                width: '100%',
                height: '6px',
                background: 'var(--bg-secondary)',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '0.5rem'
            }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-success))',
                        borderRadius: '10px'
                    }}
                />
            </div>

            <div style={{
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem'
            }}>
                {progress}% Complete
            </div>
        </motion.div>
    );
};

export default ScanningScreen;

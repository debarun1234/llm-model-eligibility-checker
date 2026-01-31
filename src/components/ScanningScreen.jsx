import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Custom SVG Icons matching mockup
const CPUIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="6" width="12" height="12" rx="1" />
        <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" strokeLinecap="round" />
        <rect x="9" y="9" width="6" height="6" rx="0.5" />
    </svg>
);

const RAMIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="6" width="18" height="12" rx="1" />
        <path d="M7 6V4M11 6V4M15 6V4M19 6V4" strokeLinecap="round" />
        <path d="M6 10h2M9 10h2M12 10h2M15 10h2" strokeLinecap="round" strokeWidth="2" />
    </svg>
);

const GPUIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="7" cy="12" r="2" />
        <circle cx="17" cy="12" r="2" />
        <path d="M2 9h20M2 15h20" strokeLinecap="round" />
        <path d="M10 18v3M14 18v3" strokeLinecap="round" />
    </svg>
);

const VRAMIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <path d="M4 8h16M4 12h16M4 16h16M8 4v16M12 4v16M16 4v16" strokeLinecap="round" />
    </svg>
);

const StorageIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="7" cy="12" r="1" fill="currentColor" />
        <circle cx="11" cy="12" r="1" fill="currentColor" />
        <path d="M15 10h4M15 14h4" strokeLinecap="round" />
    </svg>
);

const ScanningScreen = ({ onScanComplete }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Detecting components and analyzing capabilities...');
    const [components, setComponents] = useState({
        cpu: { status: 'pending', label: 'CPU', value: '', icon: <CPUIcon /> },
        ram: { status: 'pending', label: 'RAM', value: '', icon: <RAMIcon /> },
        gpu: { status: 'pending', label: 'GPU', value: '', icon: <GPUIcon /> },
        vram: { status: 'pending', label: 'VRAM', value: '', icon: <VRAMIcon /> },
        storage: { status: 'pending', label: 'Storage', value: '', icon: <StorageIcon /> }
    });

    const updateComponent = (key, status, value = '', icon = '') => {
        setComponents(prev => ({
            ...prev,
            [key]: { ...prev[key], status, value, icon: icon || prev[key].icon }
        }));
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
                await new Promise(resolve => setTimeout(resolve, 300));

                // CPU Detection
                setProgress(15);
                setStatus('Detecting CPU...');
                updateComponent('cpu', 'scanning');

                const result = await window.electronAPI.scanSystem();

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
                    updateComponent('vram', 'warning', 'Unified/Shared');
                }

                // Storage Detection
                setProgress(85);
                setStatus('Checking storage...');
                updateComponent('storage', 'scanning');
                await new Promise(resolve => setTimeout(resolve, 400));
                const hasSSD = systemData.diskLayout.some(d => d.type === 'SSD' || d.type === 'NVMe');
                const totalGB = Math.round(systemData.diskLayout.reduce((acc, d) => acc + d.size, 0) / (1024 * 1024 * 1024));
                if (hasSSD) {
                    updateComponent('storage', 'success', `${totalGB}GB NVMe SSD`);
                } else {
                    updateComponent('storage', 'warning', `${totalGB}GB HDD`);
                }

                setProgress(100);
                setStatus('Analysis complete!');

                await new Promise(resolve => setTimeout(resolve, 800));
                onScanComplete(systemData);
            } catch (error) {
                console.error('Scan failed:', error);
                setStatus('Scan failed. Please try again.');
                Object.keys(components).forEach(key => updateComponent(key, 'error', 'Detection failed'));
            }
        };

        scan();
    }, [onScanComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="glass-card"
            style={{
                padding: '3rem',
                maxWidth: '750px',
                margin: 'auto',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                border: '2px solid rgba(0, 229, 255, 0.4)',
                boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.4),
                    0 0 60px rgba(0, 229, 255, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.15)
                `,
            }}
        >
            {/* Header with Animated Icon */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{
                        display: 'inline-block',
                        fontSize: '3rem',
                        marginBottom: '1rem',
                        filter: 'drop-shadow(0 0 20px rgba(0, 229, 255, 0.6))'
                    }}
                >
                    🔄
                </motion.div>
                <h2 style={{
                    color: 'var(--accent-primary)',
                    fontSize: '2rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    textShadow: '0 0 20px rgba(0, 229, 255, 0.5)'
                }}>
                    Scanning Your Hardware...
                </h2>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    fontWeight: '300'
                }}>
                    {status}
                </p>
            </div>

            {/* Progress Bar - BEFORE components */}
            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{
                    width: '100%',
                    height: '10px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 229, 255, 0.2)',
                    position: 'relative'
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                        style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-success))',
                            borderRadius: '10px',
                            boxShadow: '0 0 20px rgba(0, 229, 255, 0.6)',
                            position: 'relative'
                        }}
                    />
                </div>
                <div style={{
                    textAlign: 'center',
                    color: 'var(--accent-primary)',
                    fontSize: '0.85rem',
                    marginTop: '0.5rem',
                    fontWeight: '500'
                }}>
                    {progress}% Complete
                </div>
            </div>

            {/* Component Status Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
            }}>
                {Object.entries(components).map(([key, comp]) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Object.keys(components).indexOf(key) * 0.1 }}
                        style={{
                            background: 'linear-gradient(135deg, rgba(0, 20, 40, 0.6) 0%, rgba(0, 10, 20, 0.8) 100%)',
                            padding: '1.25rem 1.5rem',
                            borderRadius: '12px',
                            border: `1.5px solid ${comp.status === 'scanning' ? 'var(--accent-primary)' :
                                comp.status === 'success' ? 'rgba(0, 229, 255, 0.3)' :
                                    'rgba(255, 255, 255, 0.1)'
                                }`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            backdropFilter: 'blur(10px)',
                            boxShadow: comp.status === 'scanning'
                                ? '0 0 20px rgba(0, 229, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                : 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {/* Icon */}
                        <div style={{
                            fontSize: '2rem',
                            minWidth: '40px',
                            textAlign: 'center',
                            color: comp.status === 'scanning'
                                ? 'var(--accent-primary)'
                                : comp.status === 'success'
                                    ? 'var(--accent-success)'
                                    : 'rgba(0, 229, 255, 0.3)',
                            filter: comp.status === 'scanning'
                                ? 'drop-shadow(0 0 10px var(--accent-primary))'
                                : comp.status === 'success'
                                    ? 'drop-shadow(0 0 8px var(--accent-success))'
                                    : 'none',
                            transition: 'all 0.3s ease'
                        }}>
                            {comp.icon}
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1 }}>
                            <div style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-muted)',
                                marginBottom: '0.25rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontWeight: '600'
                            }}>
                                {comp.label}
                            </div>
                            <div style={{
                                fontSize: '0.95rem',
                                color: getStatusColor(comp.status),
                                fontWeight: '500'
                            }}>
                                {comp.value || (comp.status === 'scanning' ? 'Detecting...' : 'Waiting...')}
                            </div>
                        </div>

                        {/* Status Indicator */}
                        {comp.status === 'success' && (
                            <div style={{
                                fontSize: '1.5rem',
                                color: 'var(--accent-success)',
                                filter: 'drop-shadow(0 0 8px var(--accent-success))'
                            }}>
                                ✓
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Footer Message */}
            <div style={{
                textAlign: 'center',
                marginTop: '2rem',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontStyle: 'italic'
            }}>
                This may take a few moments...
            </div>
        </motion.div>
    );
};

export default ScanningScreen;

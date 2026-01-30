import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Mock API for browser testing if window.electronAPI is missing
const mockScan = async () => {
    return new Promise(resolve => setTimeout(() => resolve({
        status: 'success',
        data: {
            cpu: { manufacturer: 'Intel', brand: 'Core i9-13900K', cores: 24 },
            mem: { total: 32 * 1024 * 1024 * 1024, available: 16 * 1024 * 1024 * 1024 },
            graphics: { controllers: [{ model: 'NVIDIA GeForce RTX 4090', vram: 24 * 1024 }] },
            diskLayout: [{ type: 'SSD', size: 1024 * 1024 * 1024 * 1024 }]
        }
    }), 2000));
};

const ScanningScreen = ({ onScanComplete }) => {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('Initializing Scanner...');
    const [scanData, setScanData] = useState(null);

    useEffect(() => {
        let mounted = true;

        const runScan = async () => {
            // Visual progress steps
            const steps = [
                { pct: 10, text: 'Detecting CPU Architecture...' },
                { pct: 30, text: 'Analyzing Memory Bandwidth...' },
                { pct: 50, text: 'Identifying GPU Accelerators...' },
                { pct: 70, text: 'Checking Storage I/O...' },
                { pct: 90, text: 'Finalizing Report...' },
            ];

            // Start actual scan in background
            const scanPromise = window.electronAPI
                ? window.electronAPI.scanSystem()
                : mockScan();

            // Animate through steps
            for (const step of steps) {
                if (!mounted) return;
                setStatusText(step.text);
                setProgress(step.pct);
                await new Promise(r => setTimeout(r, 600)); // Artificial delay for effect
            }

            try {
                const result = await scanPromise;
                if (!mounted) return;

                if (result.status === 'success') {
                    setProgress(100);
                    setStatusText('Scan Complete.');
                    setTimeout(() => {
                        onScanComplete(result.data);
                    }, 500);
                } else {
                    setStatusText('Scan Failed: ' + result.message);
                }
            } catch (e) {
                setStatusText('Error during scanning.');
                console.error(e);
            }
        };

        runScan();

        return () => { mounted = false; };
    }, [onScanComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card"
            style={{ padding: '3rem', width: '100%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}
        >
            <h2 style={{ marginBottom: '2rem', color: 'var(--accent-primary)' }}>System Analysis</h2>

            <div style={{ position: 'relative', height: '10px', background: 'var(--bg-secondary)', borderRadius: '5px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))' }}
                />
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontFamily: 'monospace' }}>
                {statusText} <span className="animate-blink">_</span>
            </p>

            {/* Visual Flair */}
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                        style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-success)' }}
                    />
                ))}
            </div>

        </motion.div>
    );
};

export default ScanningScreen;

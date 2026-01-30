import { motion } from 'framer-motion';
import { useState } from 'react';

const PermissionScreen = ({ onGrant }) => {
    const [agreed, setAgreed] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card"
            style={{ padding: '3rem', maxWidth: '600px', margin: 'auto', textAlign: 'left' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ color: 'var(--accent-warning)', fontSize: '2rem' }}>⚠</div>
                <h2 style={{ margin: 0, color: 'white' }}>System Analysis Authorization</h2>
            </div>

            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                This software requires transient read-only access to your system's hardware identifiers to generate compatibility reports.
            </p>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid var(--glass-border)' }}>
                <h3 style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1rem' }}>Access Scope</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-success)' }}>✓</span> CPU Attributes
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-success)' }}>✓</span> RAM Topology
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-success)' }}>✓</span> GPU Capabilities
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-success)' }}>✓</span> Storage I/O Class
                    </li>
                </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'flex', alignItems: 'start', gap: '0.8rem', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        style={{ marginTop: '3px', accentColor: 'var(--accent-primary)' }}
                    />
                    I understand that this software runs locally and transmits no personal data. I authorize the hardware scan.
                </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    className="neon-btn"
                    onClick={onGrant}
                    disabled={!agreed}
                    style={{
                        opacity: agreed ? 1 : 0.5,
                        cursor: agreed ? 'pointer' : 'not-allowed',
                        filter: agreed ? 'none' : 'grayscale(100%)'
                    }}
                >
                    INITIATE SYSTEMS CHECK
                </button>
            </div>
        </motion.div>
    );
};

export default PermissionScreen;

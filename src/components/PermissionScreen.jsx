import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const PrivacyPolicyModal = ({ onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card"
                style={{
                    maxWidth: '700px',
                    width: '100%',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    padding: '2.5rem',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    border: '2px solid rgba(0, 229, 255, 0.4)',
                    boxShadow: `
                        0 8px 32px rgba(0, 0, 0, 0.6),
                        0 0 60px rgba(0, 229, 255, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{
                        color: 'var(--accent-primary)',
                        margin: 0,
                        fontSize: '1.8rem',
                        textShadow: '0 0 15px rgba(0, 229, 255, 0.5)'
                    }}>
                        Privacy Policy
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: '1.5px solid rgba(0, 229, 255, 0.3)',
                            color: 'var(--accent-primary)',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(0, 229, 255, 0.1)';
                            e.target.style.borderColor = 'var(--accent-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.borderColor = 'rgba(0, 229, 255, 0.3)';
                        }}
                    >
                        ✕ Close
                    </button>
                </div>

                <div style={{ lineHeight: '1.8', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    {/* Last Updated */}
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                        Last Updated: January 31, 2026
                    </p>

                    {/* Core Principle */}
                    <div style={{
                        background: 'rgba(0, 255, 157, 0.08)',
                        border: '2px solid rgba(0, 255, 157, 0.3)',
                        borderRadius: '10px',
                        padding: '1.25rem',
                        marginBottom: '1.5rem'
                    }}>
                        <h3 style={{ color: 'var(--accent-success)', marginTop: 0, marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                            ✓ Zero Data Collection
                        </h3>
                        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                            This application is <strong>100% offline</strong>. We collect <strong>zero data</strong>.
                            No analytics, no telemetry, no tracking, no internet connection required.
                        </p>
                    </div>

                    {/* What We Access */}
                    <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem', fontSize: '1.2rem' }}>
                        What We Access
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        The app requires <strong>read-only access</strong> to your hardware specifications <strong>locally</strong> to generate compatibility reports:
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        <li><strong>CPU:</strong> Manufacturer, model, architecture (for Apple Silicon detection)</li>
                        <li><strong>RAM:</strong> Total capacity (GB)</li>
                        <li><strong>GPU:</strong> Graphics card model and manufacturer</li>
                        <li><strong>VRAM:</strong> Dedicated graphics memory (GB)</li>
                        <li><strong>Storage:</strong> Drive type (SSD/HDD) for performance estimation</li>
                    </ul>

                    {/* What We DON'T Access */}
                    <h3 style={{ color: 'var(--accent-warning)', marginBottom: '0.75rem', fontSize: '1.2rem' }}>
                        What We DON'T Access
                    </h3>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        <li>No personal files or documents</li>
                        <li>No browsing history or cookies</li>
                        <li>No network activity or IP address</li>
                        <li>No screenshots or keylogging</li>
                        <li>No serial numbers or unique identifiers</li>
                        <li>No background processes after closing the app</li>
                    </ul>

                    {/* Data Retention */}
                    <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem', fontSize: '1.2rem' }}>
                        Data Retention
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        Hardware information is processed <strong>in memory only</strong> and exists solely during your active session.
                        When you close the application, all data is discarded. Nothing is saved to disk or transmitted anywhere.
                    </p>

                    {/* Third-Party Services */}
                    <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem', fontSize: '1.2rem' }}>
                        Third-Party Services
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        <strong>None.</strong> This application does not integrate with any third-party analytics,
                        error reporting, or tracking services. It operates entirely offline.
                    </p>

                    {/* Open Source */}
                    <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem', fontSize: '1.2rem' }}>
                        Open Source Transparency
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        This software is <strong>open source</strong> under the MIT License. You can review the complete source code at:
                    </p>
                    <a
                        href="https://github.com/debarun1234/llm-model-eligibility-checker"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: 'var(--accent-primary)',
                            textDecoration: 'none',
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            border: '1px solid var(--accent-primary)',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            marginBottom: '1.5rem',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(0, 229, 255, 0.1)'}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                        View Source Code →
                    </a>

                    {/* Contact */}
                    <div style={{
                        borderTop: '1px solid rgba(0, 229, 255, 0.2)',
                        paddingTop: '1.5rem',
                        marginTop: '1.5rem'
                    }}>
                        <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                            Questions?
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                            Developer: <strong>Debarun Ghosh</strong><br />
                            GitHub: <a href="https://github.com/debarun1234" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>@debarun1234</a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const PermissionScreen = ({ onGrant }) => {
    const [agreed, setAgreed] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

    return (
        <>
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

                    {/* Privacy Policy Link */}
                    <div style={{ marginTop: '0.75rem', paddingLeft: '2rem' }}>
                        <button
                            onClick={() => setShowPrivacyPolicy(true)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--accent-primary)',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                textDecoration: 'underline',
                                padding: 0
                            }}
                        >
                            Read Privacy Policy
                        </button>
                    </div>
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

            {/* Privacy Policy Modal Overlay */}
            <AnimatePresence>
                {showPrivacyPolicy && (
                    <PrivacyPolicyModal onClose={() => setShowPrivacyPolicy(false)} />
                )}
            </AnimatePresence>
        </>
    );
};

export default PermissionScreen;

import { motion } from 'framer-motion';

const AboutScreen = ({ onBack }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{
                padding: '3rem',
                maxWidth: '800px',
                margin: 'auto',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}
        >
            <button
                onClick={onBack}
                style={{
                    background: 'transparent',
                    border: '1px solid var(--accent-primary)',
                    color: 'var(--accent-primary)',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '2rem',
                    fontFamily: 'inherit'
                }}
            >
                ← Back to App
            </button>

            <h1 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>
                About LLM Eligibility Checker
            </h1>

            <div style={{ lineHeight: '1.8', color: 'var(--text-primary)' }}>
                <h2 style={{ color: 'var(--accent-success)', marginTop: '2rem', marginBottom: '1rem' }}>
                    What is this?
                </h2>
                <p>
                    LLM Eligibility Checker is a desktop application that analyzes your computer's hardware
                    specifications and recommends the best Large Language Models (LLMs) you can run locally.
                </p>

                <h2 style={{ color: 'var(--accent-success)', marginTop: '2rem', marginBottom: '1rem' }}>
                    How it works
                </h2>
                <ul style={{ paddingLeft: '1.5rem' }}>
                    <li>Scans your CPU, RAM, GPU, VRAM, and storage</li>
                    <li>Analyzes your intended use case (chat, coding, creative, etc.)</li>
                    <li>Recommends models categorized as Best/Good/Bad fit</li>
                    <li>Provides detailed performance expectations</li>
                    <li>100% offline - no data leaves your machine</li>
                </ul>

                <h2 style={{ color: 'var(--accent-success)', marginTop: '2rem', marginBottom: '1rem' }}>
                    Why use this?
                </h2>
                <p>
                    Running LLMs locally gives you:
                </p>
                <ul style={{ paddingLeft: '1.5rem' }}>
                    <li>Complete privacy - no data sent to cloud</li>
                    <li>No API costs or subscriptions</li>
                    <li>Offline availability</li>
                    <li>Full control over your AI assistant</li>
                </ul>

                <h2 style={{ color: 'var(--accent-success)', marginTop: '2rem', marginBottom: '1rem' }}>
                    Privacy & Security
                </h2>
                <p>
                    This app ONLY accesses hardware specifications locally. No personal data, no tracking,
                    no telemetry, no internet connection required. All analysis happens on your device.
                </p>

                <h2 style={{ color: 'var(--accent-success)', marginTop: '2rem', marginBottom: '1rem' }}>
                    Version & License
                </h2>
                <p>
                    <strong>Version:</strong> 1.0.0<br />
                    <strong>License:</strong> MIT License<br />
                    <strong>Source Code:</strong> <a
                        href="https://github.com/debarun1234/llm-model-eligibility-checker"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--accent-primary)' }}
                    >
                        GitHub Repository
                    </a>
                </p>

                <h2 style={{ color: 'var(--accent-success)', marginTop: '2rem', marginBottom: '1rem' }}>
                    Credits
                </h2>
                <p>
                    Built with Electron, React, and Vite.<br />
                    Hardware detection powered by systeminformation library.<br />
                    Model database curated from HuggingFace and community sources.
                </p>

                <div style={{
                    marginTop: '3rem',
                    padding: '1.5rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '8px',
                    borderLeft: '4px solid var(--accent-primary)'
                }}>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>
                        <strong>Need help?</strong> Check the Tutorial page or visit our GitHub for documentation.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default AboutScreen;

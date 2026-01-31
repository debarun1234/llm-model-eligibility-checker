import { motion } from 'framer-motion';

const TutorialScreen = ({ onBack }) => {
    const steps = [
        {
            title: '1. Grant Permission',
            desc: 'The app needs permission to scan your hardware. This is local-only - no data is sent anywhere.',
            icon: '🔐'
        },
        {
            title: '2. Provide System Info',
            desc: 'Enter your device type, manufacturer, model, and processor architecture. This helps validate results.',
            icon: '📝'
        },
        {
            title: '3. Hardware Scan',
            desc: 'Watch as the app detects CPU, RAM, GPU, VRAM, and storage. Each component gets a ✓ or ⚠️.',
            icon: '🔍'
        },
        {
            title: '4. View Results',
            desc: 'See which LLM models are Best/Good/Bad fit for your system with detailed explanations.',
            icon: '📊'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{
                padding: '3rem',
                maxWidth: '900px',
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

            <h1 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                How to Use LLM Eligibility Checker
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                Follow these simple steps to find the perfect LLM for your system
            </p>

            {/* Steps */}
            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
                {steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        style={{
                            background: 'var(--bg-secondary)',
                            padding: '1.5rem',
                            borderRadius: '10px',
                            display: 'flex',
                            gap: '1.5rem',
                            alignItems: 'start'
                        }}
                    >
                        <div style={{ fontSize: '2.5rem' }}>{step.icon}</div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ color: 'var(--accent-success)', marginBottom: '0.5rem' }}>
                                {step.title}
                            </h3>
                            <p style={{ color: 'var(--text-primary)', lineHeight: '1.6', margin: 0 }}>
                                {step.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* FAQ Section */}
            <h2 style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>
                Frequently Asked Questions
            </h2>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <details style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                    <summary style={{ color: 'var(--accent-success)', cursor: 'pointer', fontWeight: '500' }}>
                        What does "Best," "Good," and "Bad" mean?
                    </summary>
                    <p style={{ marginTop: '0.5rem', paddingLeft: '1rem', color: 'var(--text-primary)' }}>
                        <strong>Best:</strong> Models that will run smoothly on your hardware with good performance.<br />
                        <strong>Good:</strong> Models that will run but may be slower or use more resources.<br />
                        <strong>Bad:</strong> Models that won't run well due to insufficient RAM, VRAM, or CPU.
                    </p>
                </details>

                <details style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                    <summary style={{ color: 'var(--accent-success)', cursor: 'pointer', fontWeight: '500' }}>
                        Why does it ask for manufacturer and model?
                    </summary>
                    <p style={{ marginTop: '0.5rem', paddingLeft: '1rem', color: 'var(--text-primary)' }}>
                        To prevent false claims. The app validates your input against actual detected hardware
                        to ensure accurate recommendations (e.g., you can't claim "Apple Silicon" on a Dell laptop).
                    </p>
                </details>

                <details style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                    <summary style={{ color: 'var(--accent-success)', cursor: 'pointer', fontWeight: '500' }}>
                        Is my data safe?
                    </summary>
                    <p style={{ marginTop: '0.5rem', paddingLeft: '1rem', color: 'var(--text-primary)' }}>
                        Yes! The app runs 100% locally. No data is ever sent to any server. All analysis happens
                        on your device.
                    </p>
                </details>

                <details style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                    <summary style={{ color: 'var(--accent-success)', cursor: 'pointer', fontWeight: '500' }}>
                        Can I run the recommended models immediately?
                    </summary>
                    <p style={{ marginTop: '0.5rem', paddingLeft: '1rem', color: 'var(--text-primary)' }}>
                        The app identifies which models you CAN run. To actually run them, you'll need software like
                        LM Studio, Ollama, or llama.cpp. Download the models from HuggingFace.
                    </p>
                </details>

                <details style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                    <summary style={{ color: 'var(--accent-success)', cursor: 'pointer', fontWeight: '500' }}>
                        Why do I see a warning for my HDD?
                    </summary>
                    <p style={{ marginTop: '0.5rem', paddingLeft: '1rem', color: 'var(--text-primary)' }}>
                        LLMs load models from storage, and HDDs are much slower than SSDs. This can cause long
                        model loading times. An SSD is highly recommended for better performance.
                    </p>
                </details>
            </div>

            <div style={{
                marginTop: '3rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(0, 230, 255, 0.1), rgba(163, 82, 255, 0.1))',
                borderRadius: '8px',
                border: '1px solid var(--accent-primary)',
                textAlign: 'center'
            }}>
                <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    <strong>Ready to start?</strong> Click "Back to App" and begin your scan!
                </p>
            </div>
        </motion.div>
    );
};

export default TutorialScreen;

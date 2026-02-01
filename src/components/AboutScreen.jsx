import { motion } from 'framer-motion';

const AboutScreen = ({ onBack }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{
                padding: '2.5rem',
                maxWidth: '750px',
                margin: 'auto',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                border: '2px solid rgba(0, 229, 255, 0.4)',
                boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.4),
                    0 0 60px rgba(0, 229, 255, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.15)
                `
            }}
        >
            <button
                onClick={onBack}
                className="neon-btn"
                style={{ marginBottom: '2rem', fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}
            >
                ← Back
            </button>

            <h1 style={{
                color: 'var(--accent-primary)',
                marginBottom: '1.5rem',
                textShadow: '0 0 20px rgba(0, 229, 255, 0.5)',
                fontSize: '2rem'
            }}>
                Insight AI
            </h1>

            <div style={{ lineHeight: '1.8', color: 'var(--text-primary)' }}>
                {/* What & Why */}
                <div style={{
                    background: 'rgba(0, 229, 255, 0.05)',
                    border: '1px solid rgba(0, 229, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem'
                }}>
                    <h2 style={{ color: 'var(--accent-primary)', marginTop: 0, marginBottom: '0.75rem', fontSize: '1.3rem' }}>
                        The Problem
                    </h2>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                        Ever tried downloading a 70B LLM only to realize your laptop has 8GB RAM? Yeah, we've all been there.
                        This tool tells you which models actually <strong>fit your hardware</strong> before you waste bandwidth and sanity.
                    </p>
                </div>

                {/* Features */}
                <h2 style={{ color: 'var(--accent-success)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>
                    What It Does
                </h2>
                <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    <li><strong>Smart Hardware Detection:</strong> Auto-scans CPU, RAM, GPU, VRAM (Apple Silicon? We got you)</li>
                    <li><strong>Intelligent Recommendations:</strong> Uses priority scoring—not just "top 6"—based on your use case</li>
                    <li><strong>3-Tier Categorization:</strong> BEST (plenty headroom), GOOD (tight fit), BAD (avoid these)</li>
                    <li><strong>Zero Privacy Concerns:</strong> 100% offline. No tracking, no telemetry, no cloud nonsense</li>
                    <li><strong>Glassmorphism UI:</strong> Because your desktop app shouldn't look like Windows XP</li>
                </ul>

                {/* Tech Stack */}
                <h2 style={{ color: 'var(--accent-warning)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>
                    Built With
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>
                    <strong>Frontend:</strong> React + Framer Motion + Glassmorphism CSS<br />
                    <strong>Backend:</strong> Electron + systeminformation<br />
                    <strong>Intelligence:</strong> Custom priority algorithm (use case + hardware fit + model popularity)<br />
                    <strong>Design:</strong> Cyan neon accents because we're cultured
                </p>

                {/* About Developer */}
                <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.08), rgba(0, 229, 255, 0.08))',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 229, 255, 0.3)'
                }}>
                    <h2 style={{ color: 'var(--accent-success)', marginTop: 0, marginBottom: '1rem', fontSize: '1.3rem' }}>
                        Made by Debarun Ghosh
                    </h2>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        AI/ML & Site Reliability Engineer at ANZ. Day job: wrangling LangChain, Vertex AI, and arguing with Kubernetes.
                        Night job: building tools like this because downloading the wrong LLM at 2 AM is a special kind of frustration.
                    </p>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Postgrad in Applied GenAI from Purdue. Published research on making 5G networks less power-hungry
                        (they listened—energy consumption down 30%). Former IEEE Secretary who convinced 100+ students that
                        engineering events can actually be fun.
                    </p>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>
                        <strong>Why this tool?</strong> After the 47th time helping someone pick an LLM for their hardware,
                        I automated it. You're welcome.
                    </p>

                    <div style={{ marginTop: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a
                            href="https://github.com/debarun1234"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'var(--accent-primary)',
                                textDecoration: 'none',
                                padding: '0.5rem 1rem',
                                border: '1px solid var(--accent-primary)',
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'var(--accent-primary)'}
                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                            GitHub →
                        </a>
                        <a
                            href="https://linkedin.com/in/debarun-ghosh"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'var(--accent-primary)',
                                textDecoration: 'none',
                                padding: '0.5rem 1rem',
                                border: '1px solid var(--accent-primary)',
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'var(--accent-primary)'}
                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                            LinkedIn →
                        </a>
                    </div>
                </div>

                {/* Version Footer */}
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    textAlign: 'center'
                }}>
                    <strong>v1.0.0</strong> • MIT License • <a
                        href="https://github.com/debarun1234/llm-model-eligibility-checker"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--accent-primary)' }}
                    >
                        Source Code
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default AboutScreen;

import { motion } from 'framer-motion';

// Custom SVG Icons matching mockup
const CPUIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="6" width="12" height="12" rx="1" />
        <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" strokeLinecap="round" />
        <rect x="9" y="9" width="6" height="6" rx="0.5" />
    </svg>
);

const RAMIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="6" width="18" height="12" rx="1" />
        <path d="M7 6V4M11 6V4M15 6V4M19 6V4" strokeLinecap="round" />
        <path d="M6 10h2M9 10h2M12 10h2M15 10h2" strokeLinecap="round" strokeWidth="2" />
    </svg>
);

const GPUIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="7" cy="12" r="2" />
        <circle cx="17" cy="12" r="2" />
        <path d="M2 9h20M2 15h20" strokeLinecap="round" />
        <path d="M10 18v3M14 18v3" strokeLinecap="round" />
    </svg>
);

const VRAMIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <path d="M4 8h16M4 12h16M4 16h16M8 4v16M12 4v16M16 4v16" strokeLinecap="round" />
    </svg>
);

const ResultsScreen = ({ results, onRetry }) => {
    const { rank, categorizedModels, warnings, specs } = results;

    // Safety check
    if (!categorizedModels || !categorizedModels.best) {
        return (
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--accent-error)' }}>Error Loading Results</h2>
                <p>Unable to load categorized models. Please try again.</p>
                <button className="neon-btn" onClick={onRetry}>Restart</button>
            </div>
        );
    }

    const ModelCard = ({ model, category }) => {
        const categoryColors = {
            'best': { bg: 'rgba(0, 255, 157, 0.08)', border: 'var(--accent-success)', text: 'var(--accent-success)', icon: '✓' },
            'good': { bg: 'rgba(255, 189, 0, 0.08)', border: 'var(--accent-warning)', text: 'var(--accent-warning)', icon: '✓' },
            'bad': { bg: 'rgba(255, 62, 62, 0.08)', border: 'var(--accent-error)', text: 'var(--accent-error)', icon: '✗' }
        }[category];

        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: 'linear-gradient(135deg, rgba(20, 30, 48, 0.9) 0%, rgba(10, 15, 25, 0.95) 100%)',
                    padding: '1rem',
                    borderRadius: '10px',
                    border: `1.5px solid rgba(255, 255, 255, 0.08)`,
                    marginBottom: '0.75rem',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
            >
                {/* Header with icon and model name */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{
                        fontSize: '1.25rem',
                        color: categoryColors.text,
                        minWidth: '24px',
                        textAlign: 'center',
                        filter: `drop-shadow(0 0 6px ${categoryColors.text})`
                    }}>
                        {categoryColors.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{
                            color: '#fff',
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginBottom: '0.15rem',
                            lineHeight: '1.3'
                        }}>
                            {model.name}
                        </h4>
                        <div style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontWeight: '500'
                        }}>
                            {model.quantization}
                        </div>
                    </div>
                </div>

                {/* Fit Reason */}
                <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    paddingLeft: '2rem'
                }}>
                    <strong style={{ color: categoryColors.text }}>Fit Reason:</strong> {model.fitReason}
                </div>
            </motion.div>
        );
    };

    const CategoryColumn = ({ title, models, category, color, description }) => {
        if (!models || models.length === 0) return null;

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    padding: '1rem',
                    borderRadius: '16px',
                    border: `2px solid ${color}`,
                    boxShadow: `0 0 30px ${color}40, inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '450px'
                }}
            >
                {/* Section Header */}
                <div style={{
                    marginBottom: '1rem',
                    paddingBottom: '0.75rem',
                    borderBottom: `1px solid ${color}40`
                }}>
                    <h3 style={{
                        color: color,
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        textShadow: `0 0 15px ${color}80`,
                        marginBottom: '0.25rem'
                    }}>
                        {title}
                    </h3>
                    {description && (
                        <p style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            fontWeight: '400',
                            margin: 0
                        }}>
                            {description}
                        </p>
                    )}
                </div>

                {/* Models - Scrollable */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    paddingRight: '0.25rem'
                }}>
                    {models.map((model, index) => (
                        <ModelCard key={index} model={model} category={category} />
                    ))}
                </div>
            </motion.div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{
                padding: '1.5rem',
                maxWidth: '1600px',
                width: '95vw',
                margin: 'auto',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}
        >
            {/* Hardware Specs Card */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card"
                style={{
                    padding: '1.5rem',
                    marginBottom: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                    border: '2px solid rgba(0, 229, 255, 0.4)',
                    boxShadow: `
                        0 8px 32px rgba(0, 0, 0, 0.4),
                        0 0 60px rgba(0, 229, 255, 0.15),
                        inset 0 1px 0 rgba(255, 255, 255, 0.15)
                    `,
                }}
            >
                <div style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(98, 0, 255, 0.2))',
                    border: '2px solid var(--accent-primary)',
                    borderRadius: '10px',
                    padding: '0.4rem 1.25rem',
                    marginBottom: '1.25rem',
                    boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <div style={{
                        color: 'var(--accent-primary)',
                        filter: 'drop-shadow(0 0 8px var(--accent-primary))',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <CPUIcon />
                    </div>
                    <h3 style={{
                        color: 'var(--accent-primary)',
                        fontSize: '1rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        textShadow: '0 0 10px rgba(0, 229, 255, 0.5)',
                        margin: 0
                    }}>
                        HARDWARE SPECS
                    </h3>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1rem'
                }}>
                    {/* CPU */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                            color: 'var(--accent-primary)',
                            filter: 'drop-shadow(0 0 8px var(--accent-primary))',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <CPUIcon />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>CPU</div>
                            <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '500' }}>{specs.cpu}</div>
                        </div>
                    </div>

                    {/* RAM */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                            color: 'var(--accent-primary)',
                            filter: 'drop-shadow(0 0 8px var(--accent-primary))',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <RAMIcon />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>RAM</div>
                            <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '500' }}>{specs.ram}</div>
                        </div>
                    </div>

                    {/* GPU */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                            color: 'var(--accent-primary)',
                            filter: 'drop-shadow(0 0 8px var(--accent-primary))',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <GPUIcon />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>GPU</div>
                            <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '500' }}>{specs.gpu}</div>
                        </div>
                    </div>

                    {/* VRAM */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                            color: 'var(--accent-primary)',
                            filter: 'drop-shadow(0 0 8px var(--accent-primary))',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <VRAMIcon />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>VRAM</div>
                            <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '500' }}>{specs.vram}</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* 3-Column Grid for Categories - Responsive */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.25rem',
                marginBottom: '1.5rem',
                minHeight: '500px',
                width: '100%'
            }}>
                <CategoryColumn
                    title="BEST MODELS"
                    models={categorizedModels.best}
                    category="best"
                    color="var(--accent-success)"
                    description="Optimal performance with plenty of headroom"
                />

                <CategoryColumn
                    title="GOOD MODELS"
                    models={categorizedModels.good}
                    category="good"
                    color="var(--accent-warning)"
                    description="Will run, but tight on resources"
                />

                <CategoryColumn
                    title="BAD MODELS"
                    models={categorizedModels.bad}
                    category="bad"
                    color="var(--accent-error)"
                    description="Not recommended"
                />
            </div>

            {/* Warnings */}
            {warnings && warnings.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        background: 'rgba(255, 189, 0, 0.1)',
                        border: '1.5px solid var(--accent-warning)',
                        borderRadius: '12px',
                        padding: '1rem',
                        marginBottom: '1rem'
                    }}
                >
                    <h4 style={{ color: 'var(--accent-warning)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>⚠️ Warnings</h4>
                    {warnings.map((warning, i) => (
                        <div key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                            • {warning}
                        </div>
                    ))}
                </motion.div>
            )}

            {/* Restart Button */}
            <div style={{ textAlign: 'center' }}>
                <button
                    onClick={onRetry}
                    className="neon-btn"
                    style={{ fontSize: '0.95rem', padding: '0.7rem 2rem' }}
                >
                    🔄 RESTART ANALYSIS
                </button>
            </div>
        </motion.div>
    );
};

export default ResultsScreen;

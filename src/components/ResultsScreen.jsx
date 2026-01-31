import { useState } from 'react';
import { motion } from 'framer-motion';

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

    const rankColor = {
        'Best': 'var(--accent-success)',
        'Good': 'var(--accent-warning)',
        'Bad': 'var(--accent-error)'
    }[rank];

    const ModelCard = ({ model, category }) => {
        const categoryColor = {
            'best': 'var(--accent-success)',
            'good': 'var(--accent-warning)',
            'bad': 'var(--accent-error)'
        }[category];

        return (
            <div style={{ borderLeft: `3px solid ${categoryColor}`, paddingLeft: '10px', marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{model.name}</span>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.65em', background: categoryColor, color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                            {category.toUpperCase()}
                        </span>
                        <span style={{ fontSize: '0.65em', background: '#333', padding: '2px 6px', borderRadius: '4px' }}>
                            {model.quantization}
                        </span>
                    </div>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#aaa', marginBottom: '3px' }}>{model.description}</div>
                <div style={{ fontSize: '0.65rem', color: '#666' }}>
                    {model.fitReason} • VRAM: {model.req_vram_gb}GB
                </div>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{ padding: '2rem', maxWidth: '1000px', margin: 'auto', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>System Capability Verdict</h2>
                <h1 style={{ fontSize: '4rem', color: rankColor, textShadow: `0 0 20px ${rankColor}` }}>
                    {rank}
                </h1>
            </div>

            {/* Hardware Specs */}
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.8rem', fontSize: '1rem' }}>Detected Hardware</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <div><strong style={{ color: '#888' }}>CPU:</strong> {specs.cpu}</div>
                    <div><strong style={{ color: '#888' }}>GPU:</strong> {specs.gpu}</div>
                    <div><strong style={{ color: '#888' }}>RAM:</strong> {specs.ram}</div>
                    <div><strong style={{ color: '#888' }}>VRAM:</strong> {specs.vram}</div>
                </div>
            </div>

            {/* Model Categories */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>
                    Model Compatibility Analysis
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '1rem' }}>
                    Showing objective fit rating for all market models. This proves our recommendations aren't biased.
                </div>

                {/* Best Models */}
                {categorizedModels.best.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{
                            color: 'var(--accent-success)',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            🟢 BEST FIT ({categorizedModels.best.length})
                            <span style={{ fontSize: '0.7rem', fontWeight: 'normal', color: '#888' }}>Optimal performance, plenty of headroom</span>
                        </div>
                        <div style={{ background: 'rgba(0, 255, 0, 0.05)', padding: '0.8rem', borderRadius: '6px' }}>
                            {categorizedModels.best.slice(0, 4).map((model, idx) => (
                                <ModelCard key={idx} model={model} category="best" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Good Models */}
                {categorizedModels.good.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{
                            color: 'var(--accent-warning)',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            🟡 GOOD FIT ({categorizedModels.good.length})
                            <span style={{ fontSize: '0.7rem', fontWeight: 'normal', color: '#888' }}>Will run, but tight on resources</span>
                        </div>
                        <div style={{ background: 'rgba(255, 189, 0, 0.05)', padding: '0.8rem', borderRadius: '6px' }}>
                            {categorizedModels.good.slice(0, 3).map((model, idx) => (
                                <ModelCard key={idx} model={model} category="good" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Bad Models */}
                {categorizedModels.bad.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{
                            color: 'var(--accent-error)',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            🔴 NOT RECOMMENDED ({categorizedModels.bad.length})
                            <span style={{ fontSize: '0.7rem', fontWeight: 'normal', color: '#888' }}>Will struggle or require CPU offloading</span>
                        </div>
                        <div style={{ background: 'rgba(255, 0, 0, 0.05)', padding: '0.8rem', borderRadius: '6px' }}>
                            {categorizedModels.bad.slice(0, 3).map((model, idx) => (
                                <ModelCard key={idx} model={model} category="bad" />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {warnings.length > 0 && (
                <div style={{ marginBottom: '2rem', border: '1px solid var(--accent-warning)', padding: '1rem', borderRadius: '8px', background: 'rgba(255, 189, 0, 0.1)' }}>
                    <h4 style={{ color: 'var(--accent-warning)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>⚠ Performance Warnings</h4>
                    <ul style={{ paddingLeft: '20px', textAlign: 'left', fontSize: '0.85rem', margin: 0 }}>
                        {warnings.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                </div>
            )}

            <div style={{ textAlign: 'center' }}>
                <button className="neon-btn" onClick={onRetry}>
                    Restart Analysis
                </button>
            </div>
        </motion.div>
    );
};

export default ResultsScreen;

import { useState } from 'react';
import { motion } from 'framer-motion';

const ResultsScreen = ({ results, onRetry }) => {
    const { rank, recommendations, warnings, specs } = results;

    const rankColor = {
        'Best': 'var(--accent-success)',
        'Good': 'var(--accent-warning)',
        'Bad': 'var(--accent-error)'
    }[rank];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{ padding: '2rem', maxWidth: '900px', margin: 'auto', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>System Capability Verdict</h2>
                <h1 style={{ fontSize: '4rem', color: rankColor, textShadow: `0 0 20px ${rankColor}` }}>
                    {rank}
                </h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* Specs Summary */}
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Detected Hardware</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left', fontSize: '0.9rem' }}>
                        <div><strong style={{ color: '#888' }}>CPU:</strong> {specs.cpu}</div>
                        <div><strong style={{ color: '#888' }}>RAM:</strong> {specs.ram}</div>
                        <div><strong style={{ color: '#888' }}>GPU:</strong> {specs.gpu}</div>
                        <div><strong style={{ color: '#888' }}>VRAM:</strong> {specs.vram}</div>
                    </div>
                </div>

                {/* Recommendations */}
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ color: 'var(--accent-success)', marginBottom: '1rem' }}>Compatible Models ({recommendations.length})</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '220px', overflowY: 'auto' }}>
                        {recommendations.map((rec, idx) => (
                            <div key={idx} style={{ borderLeft: '3px solid var(--accent-primary)', paddingLeft: '10px' }}>
                                <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    {rec.name}
                                    <span style={{ fontSize: '0.7em', background: '#333', padding: '2px 6px', borderRadius: '4px' }}>{rec.quantization}</span>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '4px' }}>{rec.description}</div>
                                <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '2px' }}>
                                    Req: {rec.req_vram_gb}GB VRAM • {rec.family}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {warnings.length > 0 && (
                <div style={{ marginBottom: '2rem', border: '1px solid var(--accent-warning)', padding: '1rem', borderRadius: '8px', background: 'rgba(255, 189, 0, 0.1)' }}>
                    <h4 style={{ color: 'var(--accent-warning)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>⚠ Performance Warnings</h4>
                    <ul style={{ paddingLeft: '20px', textAlign: 'left', fontSize: '0.85rem', margin: 0 }}>
                        {warnings.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                </div>
            )}

            {/* Database Info Banner */}
            <div style={{ marginBottom: '2rem', border: '1px solid var(--accent-primary)', padding: '1rem', borderRadius: '8px', background: 'rgba(0, 243, 255, 0.05)', textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                    ✓ Verified against 25+ market models
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                    Database includes: Llama 3.1, Mixtral, Gemma 2, Qwen, DeepSeek, Command R, and more
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <button className="neon-btn" onClick={onRetry}>
                    Restart Analysis
                </button>
            </div>
        </motion.div>
    );
};

export default ResultsScreen;

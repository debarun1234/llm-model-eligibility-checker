import { useState } from 'react';
import { motion } from 'framer-motion';

const InputScreen = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        deviceType: 'laptop', // 'laptop' | 'desktop'
        manufacturer: '',
        model: '',
        processorType: 'intel', // default
        intent: 'chat' // default
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.manufacturer && formData.model) {
            onSubmit(formData);
        } else {
            // Allow empty model for desktops if user types 'Custom'
            if (formData.deviceType === 'desktop' && formData.manufacturer.toLowerCase() === 'custom') {
                onSubmit({ ...formData, model: 'Custom Build' });
            } else {
                alert("Please fill in Manufacturer and Model");
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="glass-card"
            style={{ padding: '2.5rem', maxWidth: '600px', margin: 'auto' }}
        >
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>System Profile</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

                {/* Full Width Intent */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Primary Usage Intent</label>
                    <select name="intent" value={formData.intent} onChange={handleChange} className="neon-select">
                        <option value="chat">General Chat / Assistant</option>
                        <option value="dev">Coding / Development</option>
                        <option value="creative">Creative Writing / Roleplay</option>
                        <option value="data">Data Analysis / Local RAG</option>
                    </select>
                </div>

                {/* Device Type */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Form Factor</label>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: formData.deviceType === 'laptop' ? 'white' : 'gray' }}>
                            <input
                                type="radio"
                                name="deviceType"
                                value="laptop"
                                checked={formData.deviceType === 'laptop'}
                                onChange={handleChange}
                                style={{ accentColor: 'var(--accent-primary)' }}
                            />
                            Laptop / Macbook
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: formData.deviceType === 'desktop' ? 'white' : 'gray' }}>
                            <input
                                type="radio"
                                name="deviceType"
                                value="desktop"
                                checked={formData.deviceType === 'desktop'}
                                onChange={handleChange}
                                style={{ accentColor: 'var(--accent-primary)' }}
                            />
                            Desktop Workstation
                        </label>
                    </div>
                </div>

                {/* Manufacturer */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                        {formData.deviceType === 'desktop' ? 'Manufacturer / Builder' : 'Brand'}
                    </label>
                    <input
                        type="text"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        placeholder={formData.deviceType === 'desktop' ? "e.g. Custom, Dell, HP" : "e.g. Apple, Lenovo"}
                        className="neon-input"
                    />
                </div>

                {/* Model */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Model</label>
                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder={formData.deviceType === 'desktop' ? "e.g. Custom Build" : "e.g. MacBook Pro M3"}
                        className="neon-input"
                    />
                </div>

                {/* Processor Type */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Processor Architecture</label>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: formData.processorType === 'intel' ? 'white' : 'gray' }}>
                            <input
                                type="radio"
                                name="processorType"
                                value="intel"
                                checked={formData.processorType === 'intel'}
                                onChange={handleChange}
                                style={{ accentColor: 'var(--accent-primary)' }}
                            />
                            Intel / AMD (x86)
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: formData.processorType === 'apple' ? 'white' : 'gray' }}>
                            <input
                                type="radio"
                                name="processorType"
                                value="apple"
                                checked={formData.processorType === 'apple'}
                                onChange={handleChange}
                                style={{ accentColor: 'var(--accent-primary)' }}
                            />
                            Apple Silicon (M-Series)
                        </label>
                    </div>
                </div>

                <button type="submit" className="neon-btn" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                    CONFIRM & START SCAN
                </button>

            </form>
        </motion.div>
    );
};

export default InputScreen;

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { quickHardwareCheck } from '../services/hardwareValidator';

const InputScreen = ({ onSubmit }) => {
    const manufacturerRef = useRef(null);

    const [formData, setFormData] = useState({
        deviceType: 'laptop',
        manufacturer: '',
        model: '',
        processorType: 'intel',
        intent: 'chat'
    });

    const [errors, setErrors] = useState({});
    const [hardwareInfo, setHardwareInfo] = useState(null);
    const [validationWarning, setValidationWarning] = useState('');
    const [validationError, setValidationError] = useState(''); // Inline error instead of alert

    // Quick hardware check on mount
    useEffect(() => {
        const checkHardware = async () => {
            const info = await quickHardwareCheck();
            setHardwareInfo(info);
            // Check initial selection against detected hardware
            if (info) {
                validateProcessorType(formData.processorType, info);
            }
        };
        checkHardware();
    }, []);

    const validateProcessorType = (selectedType, hwInfo) => {
        if (!hwInfo) return;

        const userSaidApple = selectedType === 'apple';
        const manufacturer = formData.manufacturer.toLowerCase().trim();

        // Check if user typed an Apple manufacturer
        const userTypedApple = manufacturer.includes('apple') || manufacturer.includes('mac');

        // Don't show warning if user typed Apple AND selected Apple Silicon - that's correct!
        if (userSaidApple && userTypedApple) {
            setValidationWarning('');
            return;
        }

        // Check if user typed non-Apple brand but selected Apple Silicon
        const nonAppleBrands = ['asus', 'dell', 'hp', 'lenovo', 'acer', 'msi', 'razer', 'alienware', 'lg', 'samsung', 'microsoft', 'surface'];
        const userTypedNonApple = nonAppleBrands.some(brand => manufacturer.includes(brand));

        if (userSaidApple && userTypedNonApple) {
            setValidationWarning(`⚠️ You selected "Apple Silicon" but entered "${formData.manufacturer}" which is not an Apple brand.`);
            return;
        }

        // Only show hardware detection warning if we have valid hardware info
        if (hwInfo.cpuBrand !== 'Unknown') {
            if (userSaidApple && !hwInfo.isAppleSilicon) {
                setValidationWarning(`⚠️ You selected "Apple Silicon" but we detected a ${hwInfo.cpuBrand} system.Note: Some older Macs use Intel chips.`);
            } else if (!userSaidApple && hwInfo.isAppleSilicon) {
                setValidationWarning(`⚠️ You selected "Intel/AMD" but we detected Apple Silicon(${hwInfo.cpuBrand}).Please verify your selection.`);
            } else {
                setValidationWarning('');
            }
        } else {
            setValidationWarning('');
        }
    };

    const handleChange = (e) => {
        const newFormData = { ...formData, [e.target.name]: e.target.value };
        setFormData(newFormData);

        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: false });
        }

        // Validate processor type immediately
        if (e.target.name === 'processorType' && hardwareInfo) {
            validateProcessorType(e.target.value, hardwareInfo);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        // Required fields
        if (!formData.manufacturer.trim()) {
            newErrors.manufacturer = true;
        }
        if (!formData.model.trim()) {
            if (!(formData.deviceType === 'desktop' && formData.manufacturer.toLowerCase() === 'custom')) {
                newErrors.model = true;
            }
        }

        // CRITICAL VALIDATION: Check manufacturer vs processor type
        const manufacturer = formData.manufacturer.toLowerCase().trim();
        const isAppleProcessor = formData.processorType === 'apple';

        // Known non-Apple brands
        const nonAppleBrands = ['asus', 'dell', 'hp', 'lenovo', 'acer', 'msi', 'razer', 'alienware', 'lg', 'samsung', 'microsoft', 'surface', 'custom'];
        const isNonAppleBrand = nonAppleBrands.some(brand => manufacturer.includes(brand));

        // Known Apple brands
        const isAppleBrand = manufacturer.includes('apple') || manufacturer.includes('mac');

        // Block obvious mismatches
        if (isAppleProcessor && isNonAppleBrand) {
            setValidationError(`❌ MISMATCH: "${formData.manufacturer}" is not an Apple manufacturer. You cannot select "Apple Silicon" with a ${formData.manufacturer} device. Please select "Intel/AMD (x86)" instead.`);
            manufacturerRef.current?.focus();
            manufacturerRef.current?.select();
            return;
        }



        // ANTI-IMPERSONATION CHECK: Verify claimed hardware matches detected hardware
        if (hardwareInfo && hardwareInfo.cpuBrand !== 'Unknown') {
            const userClaimsApple = isAppleBrand || isAppleProcessor;
            const systemIsApple = hardwareInfo.isAppleSilicon || hardwareInfo.cpuBrand.includes('Apple');

            // Block if user claims Apple but system is NOT Apple
            if (userClaimsApple && !systemIsApple) {
                setValidationError(`🚫 IMPERSONATION DETECTED: You entered "${formData.manufacturer}" and selected "${isAppleProcessor ? 'Apple Silicon' : 'Intel/AMD'}", but our scan detected: ${hardwareInfo.cpuBrand}. Please enter your ACTUAL hardware information.`);
                manufacturerRef.current?.focus();
                manufacturerRef.current?.select();
                return;
            }

            // Block if user claims non-Apple but system IS Apple
            if (!userClaimsApple && systemIsApple) {
                setValidationError(`🚫 MISMATCH: You entered "${formData.manufacturer}" with "Intel/AMD", but our scan detected: ${hardwareInfo.cpuBrand} (Apple Silicon). Please select "Apple Silicon" instead.`);
                manufacturerRef.current?.focus();
                manufacturerRef.current?.select();
                return;
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Submit
        if (formData.deviceType === 'desktop' && formData.manufacturer.toLowerCase() === 'custom' && !formData.model.trim()) {
            onSubmit({ ...formData, model: 'Custom Build' });
        } else {
            onSubmit(formData);
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

            {/* Validation Warning Banner */}
            {validationWarning && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        marginBottom: '1.5rem',
                        padding: '1rem',
                        background: 'rgba(255, 189, 0, 0.15)',
                        border: '1px solid var(--accent-warning)',
                        borderRadius: '8px',
                        color: 'var(--accent-warning)',
                        fontSize: '0.9rem',
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'flex-start'
                    }}
                >
                    <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                    <div>
                        {validationWarning}
                        <div style={{ fontSize: '0.75rem', marginTop: '0.3rem', color: '#ddd' }}>
                            You can still proceed - we'll use the actual detected hardware.
                        </div>
                    </div>
                </motion.div>
            )}

            {/* VALIDATION ERROR BANNER */}
            {validationError && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        marginBottom: '1.5rem',
                        padding: '1rem',
                        background: 'rgba(255, 50, 50, 0.15)',
                        border: '2px solid var(--accent-error)',
                        borderRadius: '8px',
                        color: 'var(--accent-error)',
                        fontSize: '0.95rem',
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'flex-start',
                        boxShadow: '0 0 20px rgba(255, 50, 50, 0.3)'
                    }}
                >
                    <span style={{ fontSize: '1.5rem' }}>🚫</span>
                    <div style={{ flex: 1 }}>
                        <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Cannot Proceed:</strong>
                        {validationError}
                    </div>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

                {/* Full Width Intent */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Primary Usage Intent</label>
                    <select name="intent" value={formData.intent} onChange={handleChange} className="neon-select">
                        <option value="chat">General Chat / Assistant</option>
                        <option value="dev">Coding / Development</option>
                        <option value="creative">Creative Writing / Roleplay</option>
                        <option value="data">Data Analysis / Local RAG</option>
                        <option value="vision">Image Processing / Vision Tasks</option>
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

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                        {formData.deviceType === 'desktop' ? 'Manufacturer / Builder' : 'Brand'}
                        {errors.manufacturer && <span style={{ color: 'var(--accent-error)', marginLeft: '0.5rem' }}>*Required</span>}
                    </label>
                    <input
                        ref={manufacturerRef}
                        type="text"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        placeholder={formData.deviceType === 'desktop' ? "e.g. Custom, Dell, HP" : "e.g. Apple, Lenovo"}
                        className="neon-input"
                        style={errors.manufacturer ? { borderColor: 'var(--accent-error)', boxShadow: '0 0 10px var(--accent-error)' } : {}}
                    />
                </div>

                {/* Model */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                        Model
                        {errors.model && <span style={{ color: 'var(--accent-error)', marginLeft: '0.5rem' }}>*Required</span>}
                    </label>
                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder={formData.deviceType === 'desktop' ? "e.g. Custom Build" : "e.g. MacBook Pro M3"}
                        className="neon-input"
                        style={errors.model ? { borderColor: 'var(--accent-error)', boxShadow: '0 0 10px var(--accent-error)' } : {}}
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

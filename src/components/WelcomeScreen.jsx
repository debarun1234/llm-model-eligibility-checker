import { motion } from 'framer-motion';

const WelcomeScreen = ({ onStart }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex flex-col items-center justify-center h-full text-center p-8 glass-card"
        style={{ maxWidth: '600px', margin: 'auto', padding: '3rem' }}
    >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, #00f3ff, #7000ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            LLM Eligibility Checker
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Analyze your hardware to find the perfect Local LLM for you.
            <br />
            Accurate recommendations based on CPU, RAM, GPU, and Storage.
        </p>
        <button className="neon-btn" onClick={onStart}>
            Initialize Scan Protocol
        </button>
    </motion.div>
);

export default WelcomeScreen;

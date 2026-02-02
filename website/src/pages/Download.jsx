import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download as DownloadIcon, Send, User, AlertTriangle, ChevronDown } from 'lucide-react';
import GlowingParticles from '../components/GlowingParticles';

const SmartScreenTip = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-xs text-gray-500 hover:text-primary transition-colors py-2 group"
            >
                <span className="flex items-center gap-2">
                    <AlertTriangle size={14} className={isOpen ? "text-yellow-500" : "text-gray-600 group-hover:text-primary"} />
                    Installation Warning?
                </span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-left mt-2">
                            <h4 className="text-sm font-bold text-yellow-500 mb-1">Unrecognized App?</h4>
                            <p className="text-xs text-gray-400 mb-2">
                                Windows requires expensive certificates to verify publisher identity. As an open-source project, we haven't purchased one yet.
                            </p>
                            <div className="text-xs text-gray-300 bg-black/30 p-2 rounded border border-white/5">
                                Click <span className="text-white font-bold">More Info</span> &rarr; <span className="text-white font-bold">Run Anyway</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const LiveCounter = ({ count }) => {
    return (
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {count !== null ? count.toLocaleString() : "..."} Total Downloads
        </div>
    );
};

const FeedbackSection = () => {
    // Initial empty state (no dummy comments)
    const [feedback, setFeedback] = useState([]);
    const [input, setInput] = useState("");
    const [name, setName] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userName = isAnonymous ? "Anonymous User" : (name.trim() || "Guest User");

        const newFeedback = {
            id: Date.now(),
            user: userName,
            text: input,
            time: "Just now"
        };

        // Keep only last 15 comments
        setFeedback(prev => [newFeedback, ...prev].slice(0, 15));
        setInput("");
    };

    return (
        <div className="mt-24 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Community Feedback</h3>

            <form onSubmit={handleSubmit} className="mb-8 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name (Optional)"
                                disabled={isAnonymous}
                                className={`w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors ${isAnonymous ? 'opacity-50 cursor-not-allowed' : ''}`}
                            />
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={(e) => setIsAnonymous(e.target.checked)}
                                className="w-4 h-4 rounded border-white/30 bg-black/20 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-gray-400">Be Anonymous</span>
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary/50 transition-colors pr-12"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </form>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {feedback.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        No comments yet. Be the first to share your thoughts!
                    </div>
                ) : (
                    feedback.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-card p-4 rounded-xl border border-white/5 flex gap-4"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shrink-0">
                                <User size={20} className="text-gray-400" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-white">{item.user}</span>
                                    <span className="text-xs text-gray-500">{item.time}</span>
                                </div>
                                <p className="text-gray-300 text-sm">{item.text}</p>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

const Download = () => {
    const [count, setCount] = useState(null);

    useEffect(() => {
        const fetchDownloads = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/debarun1234/llm-model-eligibility-checker/releases');
                const data = await response.json();
                let totalDownloads = 0;
                if (Array.isArray(data)) {
                    data.forEach(release => {
                        release.assets.forEach(asset => {
                            totalDownloads += asset.download_count;
                        });
                    });
                }
                setCount(prev => (prev === null ? totalDownloads : Math.max(prev, totalDownloads)));
            } catch (error) {
                console.error("Failed to fetch download count", error);
                if (count === null) setCount(0);
            }
        };

        fetchDownloads();
        const interval = setInterval(fetchDownloads, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const handleDownloadClick = () => {
        // Optimistically increment count for immediate feedback
        setCount(prev => (prev || 0) + 1);
    };

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <LiveCounter count={count} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Get{' '}
                        <span className="relative inline-block">
                            <span className="text-gradient">Insight AI</span>
                            <GlowingParticles />
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Start analyzing your hardware locally. Select your platform below.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Windows Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="glass-card p-8 rounded-3xl border border-primary/30 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 bg-primary px-3 py-1 rounded-bl-xl text-xs font-bold text-black">RECOMMENDED</div>
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                                {/* Windows 11 Logo (Flat Blue Squares) */}
                                <svg width="32" height="32" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0H41V41H0V0Z" fill="#00A4EF" />
                                    <path d="M47 0H88V41H47V0Z" fill="#00A4EF" />
                                    <path d="M0 47H41V88H0V47Z" fill="#00A4EF" />
                                    <path d="M47 47H88V88H47V47Z" fill="#00A4EF" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Windows</h2>
                            <p className="text-gray-400 mb-8">Requires Windows 10 or 11 (64-bit)</p>

                            <a
                                href="https://github.com/debarun1234/llm-model-eligibility-checker/releases/download/v1.0.1/Insight.AI.Setup.1.0.1.exe"
                                className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-4"
                                onClick={handleDownloadClick}
                            >
                                <DownloadIcon size={20} />
                                Download .exe
                            </a>
                            <p className="text-xs text-gray-500 text-center mt-4 mb-6">v1.0.1 • ~98 MB • Installer</p>

                            {/* SmartScreen Help Collapsible */}
                            <SmartScreenTip />
                        </div>
                    </motion.div>

                    {/* macOS Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="glass-card p-8 rounded-3xl border border-primary/30 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 bg-primary px-3 py-1 rounded-bl-xl text-xs font-bold text-black">AVAILABLE</div>
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                                {/* Apple Logo (Filled) */}
                                <svg width="32" height="39" viewBox="0 0 32 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25.7958 29.8958C24.3639 31.9796 22.7937 34.0326 20.6974 34.0754C18.6756 34.1105 18.0267 32.8943 15.6888 32.8943C13.351 32.8943 12.6394 34.0754 10.6869 34.1466C8.66512 34.2179 6.84078 32.0508 5.41901 30.0027C2.51868 25.8239 0.358246 18.176 3.28479 13.0906C4.73746 10.5658 7.32757 8.96541 9.97541 8.92983C11.9686 8.89425 13.8492 10.2743 15.066 10.2743C16.2709 10.2743 18.5569 8.65083 20.9344 8.85868C22.6534 8.92983 25.4042 9.53037 27.2415 12.2198C27.1111 12.3015 23.9669 14.1565 24.0024 18.1062C24.038 22.043 27.4253 24.5804 27.4727 24.616C27.4371 24.7226 26.9632 26.4384 25.7958 29.8958ZM18.9839 5.86903C20.0753 4.5516 20.8105 2.71691 20.6085 0.902344C19.0313 0.9665 17.1248 1.95475 16.0335 3.22687C15.0609 4.349 14.1831 6.16047 14.4143 7.94098C16.1481 8.07604 17.9165 7.18731 18.9839 5.86903Z" fill="white" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-2">macOS</h2>
                            <p className="text-gray-400 mb-8">For Apple Silicon & Intel Macs</p>

                            <a
                                href="https://github.com/debarun1234/llm-model-eligibility-checker/releases/download/v1.0.1/Insight.AI-1.0.1-arm64.dmg"
                                className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-4"
                                onClick={handleDownloadClick}
                            >
                                <DownloadIcon size={20} />
                                Download .dmg
                            </a>
                            <p className="text-xs text-gray-500 text-center mt-4">v1.0.1 • Universal Binary • Disk Image</p>
                        </div>
                    </motion.div>
                </div>

                <FeedbackSection />
            </div>
        </div>
    );
};

export default Download;

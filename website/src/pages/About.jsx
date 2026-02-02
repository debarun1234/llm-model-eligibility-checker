import { motion } from 'framer-motion';
import { Code, Terminal, Heart, Coffee } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen pt-32 pb-24 px-6 relative">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">The Story Behind <span className="text-gradient">Insight AI</span></h1>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                        A tale of frustration, 2 AM downloads, and the quest for local AI supremacy.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {/* The Problem */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="glass-card p-8 rounded-3xl border border-white/10"
                    >
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                                <Terminal className="text-red-400" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-white">Why did I make this?</h2>
                                <p className="text-gray-400 leading-7 mb-4">
                                    Picture this: It's 2 AM. You just spent 4 hours downloading "Llama-3-70B-Instruct.gguf". You're excited. You load it into LM Studio. And then...
                                </p>
                                <blockquote className="border-l-4 border-red-500/50 pl-4 py-2 bg-red-900/10 rounded-r-lg italic text-red-200 mb-4">
                                    "Error: CUDA Out of Memory. Tried to allocate 48GB. You have 8GB."
                                </blockquote>
                                <p className="text-gray-400 leading-7">
                                    Pain. Pure pain. I realized I was spending more time <i>calculating</i> quantization requirements than actually using the models. So, like any rational engineer, I spent 50 hours automating a 5-minute task. You're welcome.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* The Mission */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="glass-card p-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
                    >
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <Heart className="text-primary" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-white">The Mission</h2>
                                <p className="text-gray-400 leading-7">
                                    <strong>Privacy first. Offline always.</strong>
                                    <br /><br />
                                    I believe local AI is the future. But the hardware barrier is real. Insight AI exists to lower that barrier by telling you exactly what your rig can handle—no math required. No data leaves your machine. It's just you, your GPU, and some sweet, sweet inference.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* The Developer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="glass-card p-8 rounded-3xl border border-white/10"
                    >
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-secondary p-1 shrink-0">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                    <img src="/profile.jpg" alt="Debarun Ghosh" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Debarun Ghosh</h2>
                                <p className="text-primary text-sm font-medium mb-4">AI/ML & SRE Engineer @ ANZ</p>
                                <p className="text-gray-400 leading-7 mb-6">
                                    I wrangle Kubernetes by day and build AI tools by night. Postgrad in Applied GenAI from Purdue. I once improved a 5G network's energy efficiency by 30% just so I could game longer without guilt.
                                </p>
                                <div className="flex gap-4">
                                    <a href="https://github.com/debarun1234" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.28-1.56 3.285-1.23 3.285-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                        </svg>
                                        GitHub
                                    </a>
                                    <a href="https://www.linkedin.com/in/debarunghosh2024/" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 transition-colors text-sm">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;

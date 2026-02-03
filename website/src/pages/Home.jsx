import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Cpu, Activity, BarChart3, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlowingParticles from '../components/GlowingParticles';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="glass-card p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors group"
    >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
            <Icon className="text-primary group-hover:text-white transition-colors" size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
);

const Carousel = () => {
    const images = [
        { src: "/images/input_screen.png", label: "Input Screen", desc: "Select generic models or enter custom parameters." },
        { src: "/images/scanning_screen.png", label: "Hardware Analysis", desc: "Deep scanning of CPU, RAM, and GPU capabilities." },
        { src: "/images/results_screen.png", label: "Results Dashboard", desc: "Clear eligibility recommendations." },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative mt-20 max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/10 glass-card bg-black/40">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 p-4 flex flex-col items-center justify-center"
                    >
                        {/* Image with slight overlay for text readability if needed, but here we just show image */}
                        <img
                            src={images[currentIndex].src}
                            alt={images[currentIndex].label}
                            className="w-full h-full object-contain rounded-lg"
                        />

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-center">
                            <h3 className="text-xl font-bold text-white mb-1">{images[currentIndex].label}</h3>
                            <p className="text-sm text-gray-300">{images[currentIndex].desc}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-6">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-primary' : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const Home = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (videoRef.current) {
                    if (entry.isIntersecting) {
                        videoRef.current.play().catch(() => { });
                    } else {
                        videoRef.current.pause();
                    }
                }
            },
            { threshold: 0.5 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);
    return (
        <div className="relative pt-20">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>

                <div className="relative max-w-5xl mx-auto text-center z-10">

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight"
                    >
                        Discover Your Perfect <br />
                        <span className="text-gradient">AI Model Match</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
                    >
                        Uses intelligent hardware analysis to recommend the best offline LLMs for your PC. Zero cloud dependencies. 100% Privacy.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/download" className="btn-primary flex items-center gap-2 group">
                            <Download size={20} />
                            Download Now
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button
                            onClick={() => document.getElementById('demo-video')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white font-medium flex items-center gap-2"
                        >
                            How it Works
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Demo Video Section */}
            <section id="demo-video" className="py-10 relative z-10">
                <div className="max-w-6xl mx-auto px-6 relative">
                    {/* Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 rounded-full blur-[100px] -z-10"></div>

                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            See It In <span className="text-gradient">Action</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Watch how Insight AI benchmarks your exact hardware configuration in seconds—completely offline.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass-card p-3 rounded-2xl border border-white/10 shadow-2xl shadow-primary/10 bg-black/40 backdrop-blur-xl"
                    >
                        <video
                            ref={videoRef}
                            src="/assets/demo.mp4"
                            controls
                            muted
                            loop
                            playsInline
                            className="w-full rounded-xl shadow-lg"
                            poster="/images/results_screen.png"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </motion.div>
                </div>
            </section>

            {/* Features Preview Section */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Deep Hardware{' '}
                            <span className="relative inline-block">
                                <span className="text-gradient">Intelligence</span>
                                <GlowingParticles />
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Stop guessing if a model will fit. We analyze your CPU, RAM, GPU, and VRAM to give you definitive answers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Activity}
                            title="Instant Scan"
                            description="Automatically detects system specifications including VRAM and architectural constraints in seconds."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={Cpu}
                            title="Smart Matching"
                            description="Proprietary scoring algorithm ranks models based on fit, headroom, and popularity for your use case."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={BarChart3}
                            title="Tiered Results"
                            description="Clear 'Best Fit', 'Good Fit', and 'Not Recommended' categorization so you never waste bandwidth."
                            delay={0.3}
                        />
                    </div>

                    {/* App Carousel */}
                    <Carousel />
                </div>
            </section>
        </div>
    );
};

export default Home;

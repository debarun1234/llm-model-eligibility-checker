import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Download, Github, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [latestVersion, setLatestVersion] = useState("v1.0.1");
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Fetch latest version
        const fetchVersion = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/debarun1234/llm-model-eligibility-checker/releases/latest');
                if (response.ok) {
                    const data = await response.json();
                    if (data.tag_name) setLatestVersion(data.tag_name);
                }
            } catch (e) { console.error(e); }
        };
        fetchVersion();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Download', path: '/download' },
        { name: 'Docs', path: '/docs' },
        { name: 'About', path: '/about' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark-bg/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-3 group">
                        <img
                            src="/logo.png"
                            alt="Insight AI Logo"
                            className="w-9 h-9 rounded-lg transition-transform group-hover:scale-110"
                        />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-primary group-hover:to-secondary transition-all">
                            Insight AI
                        </span>
                    </NavLink>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-gray-400'}`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <div className="relative inline-flex flex-col items-center">
                            <NavLink
                                to="/download"
                                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all text-sm font-medium flex items-center gap-2 relative z-10"
                            >
                                <Download size={16} />
                                Get App
                            </NavLink>

                            {/* Bouncing Version Tag */}
                            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-max z-20 pointer-events-none">
                                <motion.div
                                    animate={{
                                        y: [0, 5, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="flex items-center gap-1 px-2 py-1 rounded bg-black/90 border border-primary/30 text-primary text-[10px] font-bold shadow-lg shadow-primary/10"
                                >
                                    <ChevronDown size={10} className="stroke-[3] -rotate-180 absolute -top-3 left-1/2 -translate-x-1/2 text-primary" />
                                    <span>✨ {latestVersion} Available</span>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-dark-surface border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `text-base font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

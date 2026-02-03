import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-dark-bg mt-auto w-full">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src="/logo.png"
                                alt="Insight AI Logo"
                                className="w-8 h-8 rounded-lg"
                            />
                            <span className="text-xl font-bold text-white">Insight AI</span>
                        </div>
                        <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                            Discover the perfect Local LLM for your hardware. Offline, private, and intelligent hardware analysis.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/download" className="hover:text-primary transition-colors">Download</a></li>
                            <li><a href="/docs" className="hover:text-primary transition-colors">Documentation</a></li>
                            <li><a href="/about" className="hover:text-primary transition-colors">About Developer</a></li>
                            <li><a href="https://github.com/debarun1234/llm-model-eligibility-checker/releases" className="hover:text-primary transition-colors">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="https://github.com/debarun1234" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="https://linkedin.com/in/debarun-ghosh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Insight AI. Deployed and secured by Cloudflare.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

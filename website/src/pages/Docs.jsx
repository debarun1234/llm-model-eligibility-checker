import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Database,
    Shield,
    AlertTriangle,
    Cpu,
    Terminal,
    Layers,
    Zap,
    Search,
    Brain,
    Server,
    Laptop,
    ArrowRight,
    Microchip,
    Thermometer,
    BarChart3,
    ChevronDown,
    Lock,
    HardDrive,
    Gauge
} from 'lucide-react';
import modelsData from '../../../src/data/models.json';

const Section = ({ title, children, icon: Icon }) => (
    <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Icon size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">{title}</h2>
        </div>
        <div className="space-y-6 text-gray-300">
            {children}
        </div>
    </div>
);

const CodeBlock = ({ children }) => (
    <div className="p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-sm overflow-x-auto text-blue-300">
        <pre>{children}</pre>
    </div>
);

// Collapsible Section Component
const Collapsible = ({ title, children, defaultOpen = false, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon size={20} className="text-primary" />}
                    <h4 className="text-lg font-bold text-white">{title}</h4>
                </div>
                <ChevronDown
                    size={20}
                    className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-2 border-t border-white/10 text-sm text-gray-300 space-y-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const LogicFlowchart = () => {
    return (
        <div className="relative rounded-2xl bg-black/30 border border-white/10 overflow-hidden">
            <img
                src="/images/flowchart-recommendation.png"
                alt="Recommendation Engine Flowchart - Shows the algorithm flow from system scan through architecture detection to final eligibility scoring"
                className="w-full h-auto"
            />
        </div>
    );
};

const Docs = () => {
    const [activeSection, setActiveSection] = useState('architecture');

    const sections = [
        { id: 'architecture', label: 'Architecture', icon: Layers },
        { id: 'recommendation', label: 'Recommendation Engine', icon: Brain },
        { id: 'models', label: 'Supported Models', icon: Database },
        { id: 'security', label: 'Security & Privacy', icon: Shield },
        { id: 'troubleshooting', label: 'Troubleshooting', icon: AlertTriangle },
    ];

    return (
        <div className="min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sidebar Navigation */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32 space-y-2">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">Documentation</h3>
                        {sections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeSection === section.id
                                        ? 'bg-primary/10 text-primary border border-primary/20'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="font-medium">{section.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12 min-h-[600px] backdrop-blur-xl"
                        >
                            {activeSection === 'architecture' && (
                                <div className="space-y-12">
                                    <Section title="System Architecture" icon={Layers}>
                                        <p className="leading-relaxed text-base mb-8">
                                            Insight AI is a <strong>hardware-aware, offline-first desktop system</strong> designed to evaluate real-world LLM feasibility
                                            based on sustained performance, not theoretical specifications. The architecture tightly couples system introspection,
                                            memory modeling, thermal assumptions, and deterministic scoring into a single decision pipeline.
                                        </p>
                                        <p className="text-gray-400 mb-8">
                                            At a high level, the system consists of <strong>four architectural layers</strong>, each with clear responsibility
                                            boundaries and security isolation.
                                        </p>

                                        {/* Layer 1: Presentation & Control */}
                                        <Collapsible title="1. Presentation & Control Layer (Renderer Process)" icon={Laptop} defaultOpen={true}>
                                            <div className="p-4 rounded-lg bg-blue-900/10 border border-blue-500/20 mb-4">
                                                <p className="text-sm text-blue-300 font-semibold mb-1">Technology: React 18 + Framer Motion</p>
                                                <p className="text-sm text-gray-400">Execution Context: Electron Renderer (Sandboxed)</p>
                                            </div>

                                            <p className="mb-3">This layer is responsible for:</p>
                                            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-400">
                                                <li>User interaction and intent capture</li>
                                                <li>Real-time visualization of hardware detection</li>
                                                <li>Explanation-first presentation of recommendations</li>
                                            </ul>

                                            <h5 className="font-bold text-white mt-4 mb-2">Key Responsibilities</h5>
                                            <p className="mb-2">Collects user-declared context:</p>
                                            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-400">
                                                <li>Form factor (laptop / desktop)</li>
                                                <li>Intended workload (chat, dev, vision, etc.)</li>
                                                <li>Claimed processor type (Apple vs x64)</li>
                                                <li>Displays live scan states and validation warnings</li>
                                                <li>Renders model recommendations with fit reasons, not raw scores</li>
                                            </ul>

                                            <div className="mt-4 p-4 rounded-lg bg-green-900/10 border border-green-500/20">
                                                <h5 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                                                    <Lock size={16} /> Security Properties
                                                </h5>
                                                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-400 text-sm">
                                                    <li>No direct access to Node.js or OS APIs</li>
                                                    <li>No filesystem or network access</li>
                                                    <li>All privileged actions occur through a strictly scoped IPC bridge</li>
                                                </ul>
                                                <p className="text-sm text-gray-500 mt-2 italic">
                                                    This ensures the UI is incapable of hardware access or impersonation, even if compromised.
                                                </p>
                                            </div>
                                        </Collapsible>

                                        {/* Layer 2: Secure Hardware Access */}
                                        <Collapsible title="2. Secure Hardware Access Layer (Main Process)" icon={Server}>
                                            <div className="p-4 rounded-lg bg-purple-900/10 border border-purple-500/20 mb-4">
                                                <p className="text-sm text-purple-300 font-semibold mb-1">Technology: Electron Main + Node.js</p>
                                                <p className="text-sm text-gray-400">Library: systeminformation</p>
                                            </div>

                                            <p className="mb-4">
                                                This layer performs <strong>authoritative hardware detection</strong> and serves as the system's ground truth.
                                            </p>

                                            <h5 className="font-bold text-white mb-2">Detected Components</h5>
                                            <div className="grid grid-cols-2 gap-2 mb-4">
                                                <div className="p-2 bg-white/5 rounded text-sm flex items-center gap-2">
                                                    <Microchip size={14} className="text-primary" />
                                                    CPU (vendor, brand, architecture)
                                                </div>
                                                <div className="p-2 bg-white/5 rounded text-sm flex items-center gap-2">
                                                    <Microchip size={14} className="text-green-400" />
                                                    System RAM (total, usable)
                                                </div>
                                                <div className="p-2 bg-white/5 rounded text-sm flex items-center gap-2">
                                                    <Zap size={14} className="text-yellow-400" />
                                                    GPU(s) and VRAM
                                                </div>
                                                <div className="p-2 bg-white/5 rounded text-sm flex items-center gap-2">
                                                    <HardDrive size={14} className="text-blue-400" />
                                                    Storage type (SSD / HDD)
                                                </div>
                                                <div className="col-span-2 p-2 bg-white/5 rounded text-sm flex items-center gap-2">
                                                    <Layers size={14} className="text-purple-400" />
                                                    Graphics controller topology
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-lg bg-yellow-900/10 border border-yellow-500/20 mb-4">
                                                <h5 className="font-bold text-yellow-400 mb-2">Design Principle</h5>
                                                <p className="text-sm">
                                                    <strong>Detected hardware always overrides user claims.</strong>
                                                </p>
                                                <p className="text-sm text-gray-400 mt-2">
                                                    Any mismatch between user-declared hardware and detected hardware is flagged and corrected before
                                                    recommendations proceed. This prevents input spoofing and accidental misconfiguration.
                                                </p>
                                            </div>

                                            <h5 className="font-bold text-white mb-2 flex items-center gap-2">
                                                <Terminal size={18} className="text-primary" />
                                                IPC Boundary
                                            </h5>
                                            <p className="mb-2">Only one privileged method is exposed:</p>
                                            <CodeBlock>scanSystem()</CodeBlock>
                                            <p className="text-sm text-gray-500 mt-2 italic">
                                                No arbitrary commands, no passthrough APIs, no side effects.
                                            </p>
                                        </Collapsible>

                                        {/* Layer 3: Hardware Interpretation */}
                                        <Collapsible title="3. Hardware Interpretation & Normalization Layer" icon={Cpu}>
                                            <p className="mb-4">
                                                This layer converts raw hardware data into <strong>execution-relevant capability signals</strong>.
                                                This is where Insight AI diverges from spec-checking tools.
                                            </p>

                                            <h5 className="font-bold text-white text-base mb-3">3.1 Memory Architecture Modeling</h5>
                                            <p className="mb-4">The system explicitly models two incompatible memory architectures.</p>

                                            {/* Apple Silicon */}
                                            <div className="p-4 rounded-lg bg-green-900/10 border border-green-500/20 mb-4">
                                                <h6 className="font-bold text-green-400 mb-2">🍎 Apple Silicon (Unified Memory Architecture)</h6>
                                                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-400 mb-3">
                                                    <li>CPU, GPU, and Neural Engine share a single memory pool</li>
                                                    <li>No fixed VRAM boundary exists</li>
                                                    <li>Memory pressure impacts the entire system</li>
                                                </ul>
                                                <div className="p-3 bg-black/30 rounded border border-green-500/30">
                                                    <p className="text-sm font-semibold text-green-300 mb-1">Architectural Rule:</p>
                                                    <code className="text-green-400">Usable Memory = Total RAM × 0.8</code>
                                                </div>
                                                <p className="text-sm text-gray-400 mt-3">This accounts for:</p>
                                                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-500">
                                                    <li>OS and kernel reservations</li>
                                                    <li>Background services</li>
                                                    <li>Memory fragmentation</li>
                                                    <li>Sustained inference pressure</li>
                                                </ul>
                                                <p className="text-sm text-gray-500 mt-2 italic">
                                                    Unified memory is treated as flexible but fragile—powerful, but intolerant to overcommit.
                                                </p>
                                            </div>

                                            {/* x64 Systems */}
                                            <div className="p-4 rounded-lg bg-blue-900/10 border border-blue-500/20 mb-4">
                                                <h6 className="font-bold text-blue-400 mb-2">🪟 x64 Systems (Discrete GPU Architecture)</h6>
                                                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-400 mb-3">
                                                    <li>GPU VRAM is a hard execution boundary</li>
                                                    <li>System RAM is secondary and slower</li>
                                                    <li>PCIe transfer penalties are assumed</li>
                                                </ul>
                                                <div className="p-3 bg-black/30 rounded border border-blue-500/30">
                                                    <p className="text-sm font-semibold text-blue-300 mb-1">Architectural Rules:</p>
                                                    <ul className="list-disc list-inside space-y-1 ml-2 text-sm text-blue-400">
                                                        <li>VRAM determines feasibility</li>
                                                        <li>RAM is only used for offloading fallback</li>
                                                        <li>CPU-only inference is permitted but heavily penalized</li>
                                                    </ul>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-2 italic">
                                                    This reflects how CUDA-based inference behaves in practice, not in marketing slides.
                                                </p>
                                            </div>

                                            {/* Thermal Modeling */}
                                            <h5 className="font-bold text-white text-base mb-3 mt-6 flex items-center gap-2">
                                                <Thermometer size={18} className="text-orange-400" />
                                                3.2 Thermal Modeling (Sustained Performance)
                                            </h5>
                                            <p className="mb-4">
                                                Insight AI distinguishes between <strong>burst capability</strong> and <strong>sustained inference performance</strong>.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div className="p-4 rounded-lg bg-orange-900/10 border border-orange-500/20">
                                                    <h6 className="font-bold text-orange-400 mb-2">🖥️ Desktop Systems</h6>
                                                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-400">
                                                        <li>Assumed to sustain peak clocks</li>
                                                        <li>Lower headroom penalties</li>
                                                        <li>Stable long-running inference</li>
                                                    </ul>
                                                </div>
                                                <div className="p-4 rounded-lg bg-red-900/10 border border-red-500/20">
                                                    <h6 className="font-bold text-red-400 mb-2">💻 Laptop Systems</h6>
                                                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-400">
                                                        <li>Assumed thermal throttling under sustained load</li>
                                                        <li>Higher memory headroom required</li>
                                                        <li>Conservative classification thresholds</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 italic">
                                                Thermals are not guessed—they are encoded as architectural assumptions that directly affect model eligibility.
                                            </p>

                                            {/* Memory Headroom */}
                                            <h5 className="font-bold text-white text-base mb-3 mt-6 flex items-center gap-2">
                                                <Gauge size={18} className="text-purple-400" />
                                                3.3 Memory Headroom as Stability Signal
                                            </h5>
                                            <p className="mb-3">
                                                Rather than checking minimum requirements, the system evaluates <strong>headroom ratios</strong>.
                                            </p>
                                            <p className="text-sm text-gray-400 mb-3">Headroom approximates:</p>
                                            <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-400 mb-4">
                                                <li>Tensor expansion overhead</li>
                                                <li>Allocator inefficiency</li>
                                                <li>Concurrent OS activity</li>
                                                <li>Long-session stability</li>
                                            </ul>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                <div className="p-3 rounded bg-green-500/20 border border-green-500/30 text-center">
                                                    <p className="font-bold text-green-400">BEST</p>
                                                    <p className="text-sm text-gray-300">≥1.6× requirement</p>
                                                </div>
                                                <div className="p-3 rounded bg-yellow-500/20 border border-yellow-500/30 text-center">
                                                    <p className="font-bold text-yellow-400">GOOD</p>
                                                    <p className="text-sm text-gray-300">≥1.2× requirement</p>
                                                </div>
                                                <div className="p-3 rounded bg-red-500/20 border border-red-500/30 text-center">
                                                    <p className="font-bold text-red-400">BAD</p>
                                                    <p className="text-sm text-gray-300">≈1.0× requirement</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-4 italic">
                                                This ensures recommendations remain stable across repeated, real-world use.
                                            </p>
                                        </Collapsible>

                                        {/* Layer 4: Recommendation Engine */}
                                        <Collapsible title="4. Recommendation & Scoring Engine" icon={Brain}>
                                            <p className="mb-4">
                                                This is the <strong>decision core</strong> of Insight AI.
                                            </p>

                                            <h5 className="font-bold text-white mb-3">Processing Pipeline</h5>
                                            <div className="space-y-3">
                                                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                                    <p className="font-semibold text-primary mb-1 flex items-center gap-2">
                                                        <Search size={16} />
                                                        1. Intent Filtering
                                                    </p>
                                                    <p className="text-sm text-gray-400">Models are filtered by task compatibility (chat, vision, dev, etc.)</p>
                                                </div>
                                                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                                    <p className="font-semibold text-primary mb-1 flex items-center gap-2">
                                                        <ArrowRight size={16} />
                                                        2. Architecture-Specific Evaluation
                                                    </p>
                                                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-400">
                                                        <li>Apple Silicon → unified memory checks</li>
                                                        <li>x64 + NVIDIA → VRAM-first evaluation</li>
                                                        <li>CPU-only → tiny-model fallback only</li>
                                                    </ul>
                                                </div>
                                                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                                    <p className="font-semibold text-primary mb-1 flex items-center gap-2">
                                                        <ArrowRight size={16} />
                                                        3. Thermal Adjustment
                                                    </p>
                                                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-400">
                                                        <li>Laptop systems require higher headroom</li>
                                                        <li>Desktop systems receive sustained-performance confidence</li>
                                                    </ul>
                                                </div>
                                                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                                    <p className="font-semibold text-primary mb-1 flex items-center gap-2">
                                                        <ArrowRight size={16} />
                                                        4. Categorization
                                                    </p>
                                                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-400">
                                                        <li>Models classified into Best / Good / Bad</li>
                                                        <li>Non-viable models are excluded entirely</li>
                                                    </ul>
                                                </div>
                                                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                                    <p className="font-semibold text-primary mb-1 flex items-center gap-2">
                                                        <ArrowRight size={16} />
                                                        5. Explainability Layer
                                                    </p>
                                                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-400">
                                                        <li>Every recommendation includes a human-readable reason</li>
                                                        <li>Reasons reference actual detected constraints</li>
                                                    </ul>
                                                </div>
                                                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                                    <p className="font-semibold text-primary mb-1 flex items-center gap-2">
                                                        <ArrowRight size={16} />
                                                        6. Intelligent Ranking
                                                    </p>
                                                    <p className="text-sm text-gray-400 mb-2">Priority scoring favors:</p>
                                                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-400">
                                                        <li>Use-case alignment</li>
                                                        <li>Proven model families</li>
                                                        <li>Higher-quality quantizations</li>
                                                        <li>Duplicate variants are deduplicated for clarity</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Collapsible>

                                        {/* Layer 5: Data Layer */}
                                        <Collapsible title="5. Data Layer (Model Knowledge Base)" icon={Database}>
                                            <div className="p-4 rounded-lg bg-blue-900/10 border border-blue-500/20 mb-4">
                                                <p className="text-sm text-blue-300 font-semibold">Source: models.json</p>
                                            </div>

                                            <p className="mb-3">Each model includes:</p>
                                            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-400 mb-4">
                                                <li>Memory requirements (VRAM + RAM)</li>
                                                <li>Quantization level</li>
                                                <li>Use-case tags</li>
                                                <li>Descriptive metadata</li>
                                            </ul>

                                            <div className="p-4 rounded-lg bg-green-900/10 border border-green-500/20">
                                                <p className="text-sm text-green-400">
                                                    The engine operates in <strong>O(n) time</strong> over the dataset, ensuring fast,
                                                    deterministic execution even as the model library grows.
                                                </p>
                                            </div>
                                        </Collapsible>

                                        {/* Layer 6: Security */}
                                        <Collapsible title="6. Security, Privacy, and Trust Model" icon={Shield}>
                                            <p className="mb-4">
                                                Insight AI is designed as a <strong>zero-trust, zero-telemetry system</strong>.
                                            </p>

                                            <div className="p-4 rounded-lg bg-green-900/10 border border-green-500/20 mb-4">
                                                <h5 className="font-bold text-green-400 mb-3">Guarantees</h5>
                                                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-300">
                                                    <li>100% offline operation</li>
                                                    <li>No external API calls</li>
                                                    <li>No analytics, logging, or tracking</li>
                                                    <li>No hardware data leaves the device</li>
                                                </ul>
                                            </div>

                                            <div className="p-4 rounded-lg bg-blue-900/10 border border-blue-500/20">
                                                <h5 className="font-bold text-blue-400 mb-3">Electron Hardening</h5>
                                                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-300">
                                                    <li>Context isolation enabled</li>
                                                    <li>Node integration disabled</li>
                                                    <li>Minimal IPC surface</li>
                                                    <li>Optional mock hardware injection disabled in production</li>
                                                </ul>
                                            </div>
                                        </Collapsible>
                                    </Section>
                                </div>
                            )}

                            {activeSection === 'recommendation' && (
                                <div className="space-y-12">
                                    <Section title="Scoring Algorithm" icon={Brain}>
                                        <p className="leading-relaxed mb-6">
                                            The core of Insight AI is its proprietary recommendation engine. It goes far beyond checking minimum specs, implementing a complete
                                            pipeline of hardware verification, thermal modeling, and architecture matching.
                                        </p>

                                        <LogicFlowchart />

                                        {/* Algorithm Decision Breakdown */}
                                        <div className="mt-12 space-y-8">
                                            <div className="border-t border-white/10 pt-8">
                                                <h3 className="text-2xl font-bold text-white mb-4">🔍 Decision Breakdown</h3>
                                                <p className="text-gray-300 mb-6">
                                                    The flowchart above represents the exact evaluation pipeline used by the Insight AI Recommendation Engine.
                                                    Each decision point corresponds to a concrete hardware constraint or architectural rule, explained below.
                                                </p>
                                            </div>

                                            {/* Step 1 */}
                                            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                                <h4 className="text-lg font-bold text-blue-400 mb-3">1️⃣ System Hardware Scan</h4>
                                                <p className="text-sm text-gray-300 mb-2"><strong>What it means:</strong> Real-time scan using low-level OS APIs</p>
                                                <p className="text-sm text-gray-400 mb-2">Data collected: CPU, RAM, GPU(s), VRAM, disk type, form factor</p>
                                                <p className="text-sm text-gray-500"><em>Why it matters:</em> Based on detected hardware, not user-reported specs</p>
                                            </div>

                                            {/* Step 2 */}
                                            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                                <h4 className="text-lg font-bold text-blue-400 mb-3">2️⃣ Normalize Specs</h4>
                                                <p className="text-sm text-gray-300 mb-2"><strong>What it means:</strong> Convert raw data into comparable units (GB, architecture class)</p>
                                                <p className="text-sm text-gray-500"><em>Why it matters:</em> Different platforms report hardware differently—normalization ensures consistency</p>
                                            </div>

                                            {/* Step 3 */}
                                            <div className="p-6 rounded-xl bg-purple-900/10 border border-purple-500/30">
                                                <h4 className="text-lg font-bold text-purple-400 mb-3">3️⃣ Architecture Type (Apple Silicon vs x64/Windows)</h4>
                                                <p className="text-sm text-gray-300 mb-2"><strong>What it means:</strong> The system branches into two different memory models:</p>
                                                <ul className="list-disc list-inside text-sm text-gray-400 ml-4 space-y-1">
                                                    <li>Apple Silicon → Unified memory architecture</li>
                                                    <li>x64 / Windows → Discrete GPU + system RAM</li>
                                                </ul>
                                                <p className="text-sm text-gray-500 mt-2"><em>Why it matters:</em> Memory behavior differs drastically between architectures</p>
                                            </div>

                                            {/* Apple Silicon Path */}
                                            <div className="border-l-4 border-green-500/50 pl-6 space-y-4">
                                                <h4 className="text-xl font-bold text-green-400">🍎 Apple Silicon Path</h4>

                                                <div className="p-4 rounded-lg bg-green-900/10 border border-green-500/20">
                                                    <h5 className="font-bold text-green-300 mb-2">4️⃣ Unified Memory Model</h5>
                                                    <p className="text-sm text-gray-400">CPU, GPU, and Neural Engine share RAM pool—no fixed VRAM limit</p>
                                                </div>

                                                <div className="p-4 rounded-lg bg-green-900/10 border border-green-500/20">
                                                    <h5 className="font-bold text-green-300 mb-2">5️⃣ Usable Memory = RAM × 0.8</h5>
                                                    <p className="text-sm text-gray-300 mb-1"><strong>Why 0.8?</strong></p>
                                                    <ul className="list-disc list-inside text-sm text-gray-400 ml-4 space-y-1">
                                                        <li>macOS kernel + system services reserve memory</li>
                                                        <li>Prevents swap pressure and system instability</li>
                                                    </ul>
                                                </div>

                                                <div className="p-4 rounded-lg bg-green-900/10 border border-green-500/20">
                                                    <h5 className="font-bold text-green-300 mb-2">6️⃣ Headroom Check</h5>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs mt-2">
                                                        <div className="p-2 bg-green-500/20 rounded text-center">
                                                            <strong className="text-green-400">BEST</strong><br />≥ 1.6× requirement
                                                        </div>
                                                        <div className="p-2 bg-yellow-500/20 rounded text-center">
                                                            <strong className="text-yellow-400">GOOD</strong><br />≥ 1.2× requirement
                                                        </div>
                                                        <div className="p-2 bg-red-500/20 rounded text-center">
                                                            <strong className="text-red-400">BAD</strong><br />≥ 1.0× requirement
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-2"><em>Why it matters:</em> Near-limit usage causes throttling and crashes</p>
                                                </div>
                                            </div>

                                            {/* x64 / Windows Path */}
                                            <div className="border-l-4 border-blue-500/50 pl-6 space-y-4">
                                                <h4 className="text-xl font-bold text-blue-400">🧠 x64 / Windows Path</h4>

                                                <div className="p-4 rounded-lg bg-blue-900/10 border border-blue-500/20">
                                                    <h5 className="font-bold text-blue-300 mb-2">7️⃣ NVIDIA GPU Present?</h5>
                                                    <p className="text-sm text-gray-400">Checks for CUDA-capable NVIDIA GPU</p>
                                                    <p className="text-sm text-gray-500 mt-1"><em>Why it matters:</em> Most LLM inference requires CUDA</p>
                                                </div>

                                                <div className="p-4 rounded-lg bg-blue-900/10 border border-blue-500/20">
                                                    <h5 className="font-bold text-blue-300 mb-2">9️⃣ VRAM Evaluation</h5>
                                                    <p className="text-sm text-gray-300 mb-2"><strong>Thresholds:</strong></p>
                                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                                        <div className="p-2 bg-white/5 rounded">
                                                            <strong className="text-blue-300">Desktop BEST:</strong> ≥ 1.4× req
                                                        </div>
                                                        <div className="p-2 bg-white/5 rounded">
                                                            <strong className="text-orange-300">Laptop BEST:</strong> ≥ 1.6× req
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-2"><em>Why different?</em> Laptops experience thermal throttling under load</p>
                                                </div>

                                                <div className="p-4 rounded-lg bg-orange-900/10 border border-orange-500/20">
                                                    <h5 className="font-bold text-orange-300 mb-2">🔥 Form Factor Check</h5>
                                                    <p className="text-sm text-gray-400">Adjusts expectations based on cooling capability</p>
                                                    <p className="text-sm text-gray-500 mt-1">Desktop: sustained performance | Laptop: thermal limits</p>
                                                </div>

                                                <div className="p-4 rounded-lg bg-red-900/10 border border-red-500/20">
                                                    <h5 className="font-bold text-red-300 mb-2">🔟 RAM Offload Possible?</h5>
                                                    <p className="text-sm text-gray-300 mb-1">Checks if RAM can compensate for insufficient VRAM</p>
                                                    <p className="text-sm text-gray-400">Yes → BAD (works, but slow) | No → Reject</p>
                                                    <p className="text-sm text-gray-500 mt-1"><em>Why it matters:</em> RAM offloading trades correctness for performance</p>
                                                </div>
                                            </div>

                                            {/* Final Classification */}
                                            <div className="p-6 rounded-xl bg-purple-900/20 border border-purple-500/30">
                                                <h4 className="text-lg font-bold text-purple-400 mb-3">🏁 Final Classification</h4>
                                                <p className="text-sm text-gray-300 mb-3">Each model is assigned a final tier:</p>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-center">
                                                        <strong className="text-green-400 block mb-1">BEST</strong>
                                                        <p className="text-xs text-gray-400">Optimal performance, safe headroom</p>
                                                    </div>
                                                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-center">
                                                        <strong className="text-yellow-400 block mb-1">GOOD</strong>
                                                        <p className="text-xs text-gray-400">Stable, acceptable performance</p>
                                                    </div>
                                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-center">
                                                        <strong className="text-red-400 block mb-1">BAD</strong>
                                                        <p className="text-xs text-gray-400">Runs, but slow or constrained</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Categorize & Rank */}
                                            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                                <h4 className="text-lg font-bold text-white mb-3">1️⃣2️⃣ Categorize & Rank Models</h4>
                                                <p className="text-sm text-gray-300 mb-2">Models are:</p>
                                                <ul className="list-disc list-inside text-sm text-gray-400 space-y-1 ml-4">
                                                    <li>Grouped by tier</li>
                                                    <li>Ranked by intent relevance</li>
                                                    <li>Deduplicated by base model</li>
                                                    <li>Annotated with explainable fit reasons</li>
                                                </ul>
                                                <p className="text-sm text-gray-500 mt-2"><em>This ensures clarity, diversity, and trust.</em></p>
                                            </div>
                                        </div>
                                    </Section>
                                </div>
                            )}

                            {activeSection === 'models' && (
                                <div className="space-y-8">
                                    <Section title="Knowledge Base" icon={Database}>
                                        <p className="mb-6">
                                            Insight AI tracks {modelsData.length} generic and specialized LLMs, ranging from tiny mobile models (1-3GB) to massive enterprise clusters (100GB+).
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {modelsData.slice(0, 10).map(model => (
                                                <div key={model.id} className="p-4 rounded-xl bg-white/5 border border-white/5">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-bold text-white text-sm">{model.name}</h4>
                                                        <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/20">
                                                            {model.size_params}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-gray-400 font-mono mb-2">
                                                        VRAM: {model.req_vram_gb}GB | RAM: {model.req_ram_gb}GB
                                                    </div>
                                                    <div className="flex gap-2 flex-wrap">
                                                        {model.tags.map(tag => (
                                                            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-center text-sm text-gray-500 mt-4">
                                            ...and {modelsData.length - 10} more models.
                                        </p>
                                    </Section>
                                </div>
                            )}

                            {activeSection === 'security' && (
                                <div className="space-y-12">
                                    <Section title="Security & Impersonation" icon={Shield}>
                                        <p className="leading-relaxed mb-6">
                                            We take security seriously. Since the app detects hardware deep within your OS, we implemented stricter controls than standard web apps.
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                            <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                                                <h4 className="font-bold text-green-400 mb-2">Offline First</h4>
                                                <p className="text-xs text-gray-400">
                                                    Zero external calls. Your hardware data never leaves your device.
                                                </p>
                                            </div>
                                            <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                                <h4 className="font-bold text-blue-400 mb-2">Sandboxed</h4>
                                                <p className="text-xs text-gray-400">
                                                    Renderer process has no filesystem access. Only specific channels open.
                                                </p>
                                            </div>
                                            <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                                                <h4 className="font-bold text-red-400 mb-2">Error Handling</h4>
                                                <p className="text-xs text-gray-400">
                                                    Graceful degradation if hardware sensors fail or permissions denied.
                                                </p>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-4">Hardware Impersonation</h3>
                                        <p>
                                            For debugging, developers can inject a <code>mock_hardware.json</code> profile to test how the Recommendation Engine behaves on different machines.
                                            This feature is disabled in production builds.
                                        </p>
                                    </Section>
                                </div>
                            )}

                            {activeSection === 'troubleshooting' && (
                                <div className="space-y-12">
                                    <Section title="Installation Issues" icon={AlertTriangle}>
                                        <p className="leading-relaxed mb-6">
                                            Common installation problems and their solutions.
                                        </p>

                                        {/* Issue 1: Brief cursor then nothing */}
                                        <div className="p-6 rounded-xl bg-red-900/10 border border-red-500/20 mb-6">
                                            <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
                                                <AlertTriangle size={20} />
                                                Installer shows loading cursor briefly, then disappears
                                            </h3>

                                            <div className="mb-4">
                                                <p className="text-sm text-gray-300 mb-3">
                                                    <strong>Cause:</strong> Missing Visual C++ Redistributables (required by Electron apps)
                                                </p>

                                                <p className="text-sm font-bold text-green-400 mb-2">✅ Solution:</p>
                                                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300 ml-4">
                                                    <li>Download Visual C++ Redistributables:
                                                        <a
                                                            href="https://aka.ms/vs/17/release/vc_redist.x64.exe"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary hover:underline ml-2"
                                                        >
                                                            Official Microsoft Link
                                                        </a>
                                                    </li>
                                                    <li>Run the installer (takes ~5 minutes)</li>
                                                    <li>Restart your computer</li>
                                                    <li>Try installing Insight AI again</li>
                                                </ol>
                                            </div>
                                        </div>

                                        {/* Issue 2: Windows SmartScreen */}
                                        <div className="p-6 rounded-xl bg-yellow-900/10 border border-yellow-500/20 mb-6">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-3">
                                                Windows SmartScreen Warning
                                            </h3>

                                            <div className="mb-4">
                                                <p className="text-sm text-gray-300 mb-3">
                                                    <strong>Cause:</strong> App is not code-signed (certificates cost $400+/year)
                                                </p>

                                                <p className="text-sm font-bold text-green-400 mb-2">✅ Solution:</p>
                                                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300 ml-4">
                                                    <li>When the blue SmartScreen popup appears, click <strong>"More info"</strong></li>
                                                    <li>Click the <strong>"Run anyway"</strong> button</li>
                                                    <li>Installer should now start normally</li>
                                                </ol>
                                            </div>
                                        </div>

                                        {/* Issue 3: Nothing happens */}
                                        <div className="p-6 rounded-xl bg-blue-900/10 border border-blue-500/20 mb-6">
                                            <h3 className="text-lg font-bold text-blue-400 mb-3">
                                                Double-click does nothing
                                            </h3>

                                            <div className="mb-4">
                                                <p className="text-sm font-bold text-green-400 mb-2">✅ Try these steps:</p>
                                                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300 ml-4">
                                                    <li><strong>Run as Administrator:</strong> Right-click → "Run as administrator"</li>
                                                    <li><strong>Check Windows Defender:</strong> Open Windows Security → Virus & threat protection → Protection history</li>
                                                    <li><strong>Check Antivirus:</strong> If you have Norton/McAfee/Kaspersky, check quarantine</li>
                                                    <li><strong>Command Prompt:</strong> Open CMD, navigate to Downloads, run the .exe to see error messages</li>
                                                </ol>
                                            </div>
                                        </div>

                                        {/* System Requirements */}
                                        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                            <h3 className="text-lg font-bold text-white mb-3">System Requirements</h3>
                                            <ul className="space-y-2 text-sm text-gray-300">
                                                <li>• <strong>OS:</strong> Windows 10/11 (64-bit)</li>
                                                <li>• <strong>RAM:</strong> 4GB minimum (8GB recommended)</li>
                                                <li>• <strong>Disk Space:</strong> 500MB for installation</li>
                                                <li>• <strong>Dependencies:</strong> Visual C++ Redistributables (auto-installs if missing)</li>
                                            </ul>
                                        </div>
                                    </Section>
                                </div>
                            )}

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Docs;

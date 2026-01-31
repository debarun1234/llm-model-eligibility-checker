import modelDB from '../data/models.json';

export function analyzeHardware(systemData, userIntent, formFactor = 'laptop', userProcessorType) {
    const { mem, graphics, cpu, diskLayout } = systemData;

    // Hardware Specs
    const totalRamGB = mem.total / (1024 * 1024 * 1024);
    const vramGB = graphics.controllers.reduce((acc, gpu) => acc + (gpu.vram || 0), 0) / 1024;

    const isAppleSilicon = cpu.manufacturer.includes('Apple');

    let score = 0;
    let rank = 'Bad';
    let warnings = [];

    // --- SCORING ---
    if (isAppleSilicon) {
        score += 30;
        if (totalRamGB >= 16) score += 20;
        if (totalRamGB >= 32) score += 30;
        if (totalRamGB >= 64) score += 20;
    } else {
        const hasNvidia = graphics.controllers.some(g => g.model.toLowerCase().includes('nvidia'));
        if (hasNvidia) {
            score += 20;
            if (vramGB >= 24) score += 50;
            else if (vramGB >= 16) score += 40;
            else if (vramGB >= 12) score += 30;
            else if (vramGB >= 8) score += 15;
            else score -= 10;
        } else {
            score -= 20;
            warnings.push("No NVIDIA GPU detected. Models will run on CPU (Slow).");
        }
    }

    if (totalRamGB < 8) {
        score = 0;
        warnings.push("System RAM is critically low (<8GB).");
    }

    const hasSSD = diskLayout.some(d => d.type === 'SSD' || d.type === 'NVMe');
    if (!hasSSD) warnings.push("HDD detected. Model load times will be slow.");

    if (formFactor === 'laptop' && !isAppleSilicon) {
        warnings.push("Laptop thermal constraints may limit sustained performance.");
    }

    // --- RANKING ---
    if (score >= 80) rank = 'Best';
    else if (score >= 40) rank = 'Good';
    else rank = 'Bad';

    // --- MODEL CATEGORIZATION ---
    const categorizedModels = {
        best: [],
        good: [],
        bad: []
    };

    // --- VALIDATION: Check user input vs actual hardware ---
    const validationWarnings = [];

    // Check processor type mismatch
    const userSaidApple = userProcessorType === 'apple';
    if (userSaidApple && !isAppleSilicon) {
        validationWarnings.push("⚠️ INPUT MISMATCH: You selected 'Apple Silicon' but we detected a Windows/Intel system. Using ACTUAL detected hardware for recommendations.");
    } else if (!userSaidApple && isAppleSilicon) {
        validationWarnings.push("⚠️ INPUT MISMATCH: You selected 'Intel/AMD' but we detected Apple Silicon. Using ACTUAL detected hardware for recommendations.");
    }

    modelDB.forEach(model => {
        // Intent matching with support for vision/multimodal
        let intentMatch = false;

        if (userIntent === 'chat') {
            intentMatch = true; // All models work for chat
        } else if (userIntent === 'vision') {
            // Vision intent requires vision or multimodal tags
            intentMatch = model.tags.includes('vision') || model.tags.includes('multimodal');
        } else {
            // Other intents (dev, creative, data)
            intentMatch = model.tags.includes(userIntent) || model.tags.includes('general');
        }

        if (!intentMatch) return;

        let modelFit = 'bad';

        // APPLE SILICON: Unified memory architecture
        if (isAppleSilicon) {
            // Apple Silicon uses unified memory efficiently
            // Neural Engine + GPU share RAM pool
            // More efficient than discrete GPU systems
            const availableForModel = totalRamGB * 0.80; // 80% usable (macOS is efficient)

            if (availableForModel >= model.req_ram_gb * 1.6) {
                // 60% headroom = best performance
                modelFit = 'best';
            } else if (availableForModel >= model.req_ram_gb * 1.2) {
                // 20% headroom = good performance
                modelFit = 'good';
            } else if (availableForModel >= model.req_ram_gb) {
                // Meets minimum = bad (will work but slow)
                modelFit = 'bad';
            } else {
                // Can't fit = skip this model
                return;
            }

            // WINDOWS/LINUX: Discrete GPU + RAM architecture
        } else {
            const hasNvidia = graphics.controllers.some(g => g.model.toLowerCase().includes('nvidia'));

            if (!hasNvidia) {
                // CPU-only inference: very slow, only recommend tiny models
                if (model.req_vram_gb > 8) return; // Skip large models entirely

                // Check if model fits in system RAM
                if (totalRamGB >= model.req_ram_gb * 2) {
                    modelFit = 'bad'; // CPU inference is always "bad" but possible
                } else {
                    return; // Not enough RAM
                }
            } else {
                // DEDICATED GPU: Check VRAM first, then RAM

                // VRAM requirements (models load here for GPU inference)
                if (vramGB >= model.req_vram_gb * 1.4) {
                    // 40% VRAM headroom = best performance

                    // DESKTOP bonus: sustained performance, no thermal throttling
                    if (formFactor === 'desktop') {
                        modelFit = 'best'; // Desktop can sustain max performance
                    } else {
                        // Laptop: thermal throttling may occur under sustained load
                        modelFit = vramGB >= model.req_vram_gb * 1.6 ? 'best' : 'good';
                    }

                } else if (vramGB >= model.req_vram_gb * 1.15) {
                    // 15% VRAM headroom = good performance
                    modelFit = formFactor === 'desktop' ? 'good' : 'good';

                } else if (vramGB >= model.req_vram_gb) {
                    // Meets VRAM minimum = bad (will work but may be slow/unstable)
                    modelFit = 'bad';

                } else if (totalRamGB >= model.req_ram_gb + 8) {
                    // Doesn't fit in VRAM but has lots of RAM for offloading
                    // This is SLOW but possible
                    modelFit = 'bad';
                } else {
                    // Can't run this model
                    return;
                }
            }
        }

        categorizedModels[modelFit].push({
            ...model,
            fitReason: getFitReason(modelFit, model, vramGB, totalRamGB, isAppleSilicon, formFactor)
        });
    });

    categorizedModels.best.sort((a, b) => parseInt(b.size_params) - parseInt(a.size_params));
    categorizedModels.good.sort((a, b) => parseInt(b.size_params) - parseInt(a.size_params));
    categorizedModels.bad.sort((a, b) => parseInt(b.size_params) - parseInt(a.size_params));

    return {
        rank,
        score,
        specs: {
            cpu: `${cpu.manufacturer} ${cpu.brand}`,
            ram: `${Math.round(totalRamGB)} GB`,
            gpu: graphics.controllers.map(g => g.model).join(', '),
            vram: isAppleSilicon ? "Unified" : `${Math.round(vramGB)} GB`
        },
        categorizedModels,
        warnings: [...warnings, ...validationWarnings]
    };
}

function getFitReason(fitLevel, model, vramGB, ramGB, isAppleSilicon, formFactor) {
    if (isAppleSilicon) {
        // Apple Silicon unified memory explanations
        if (fitLevel === 'best') {
            return `✅ Excellent fit in unified memory (${Math.round(ramGB * 0.8)}GB available, needs ${model.req_ram_gb}GB)`;
        } else if (fitLevel === 'good') {
            return `✓ Fits in unified memory with moderate headroom`;
        } else {
            return `⚠️ Minimal headroom - may be slow under load`;
        }
    } else {
        // Windows/Linux discrete GPU explanations
        const hasNvidia = vramGB > 0;

        if (!hasNvidia) {
            return `⚠️ CPU-only inference (no NVIDIA GPU) - will be very slow`;
        }

        if (fitLevel === 'best') {
            if (formFactor === 'desktop') {
                return `✅ ${Math.round(vramGB)}GB VRAM » ${model.req_vram_gb}GB needed. Desktop = sustained performance`;
            } else {
                return `✅ ${Math.round(vramGB)}GB VRAM » ${model.req_vram_gb}GB needed. Watch thermals on laptop`;
            }
        } else if (fitLevel === 'good') {
            return `✓ Fits in ${Math.round(vramGB)}GB VRAM (needs ${model.req_vram_gb}GB)`;
        } else {
            if (vramGB >= model.req_vram_gb) {
                return `⚠️ Minimal VRAM headroom - may stutter or be unstable`;
            } else {
                return `⚠️ Will offload to RAM (VRAM: ${Math.round(vramGB)}GB < ${model.req_vram_gb}GB needed) - slow inference`;
            }
        }
    }
}

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
        if (isAppleSilicon) {
            const availableForModel = totalRamGB * 0.75;

            if (availableForModel >= model.req_ram_gb * 1.5) {
                modelFit = 'best';
            } else if (availableForModel >= model.req_ram_gb) {
                modelFit = 'good';
            } else {
                modelFit = 'bad';
            }
        } else {
            if (vramGB >= model.req_vram_gb * 1.3) {
                modelFit = 'best';
            } else if (vramGB >= model.req_vram_gb) {
                modelFit = 'good';
            } else if (totalRamGB >= model.req_ram_gb + 4) {
                modelFit = 'bad';
            } else {
                modelFit = 'bad';
            }
        }

        categorizedModels[modelFit].push({
            ...model,
            fitReason: getFitReason(modelFit, model, vramGB, totalRamGB, isAppleSilicon)
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

function getFitReason(fitLevel, model, vramGB, ramGB, isAppleSilicon) {
    if (fitLevel === 'best') {
        return isAppleSilicon
            ? `Plenty of RAM headroom (${Math.round(ramGB * 0.75)}GB available)`
            : `VRAM: ${Math.round(vramGB)}GB >> ${model.req_vram_gb}GB needed`;
    } else if (fitLevel === 'good') {
        return isAppleSilicon
            ? `Fits in unified memory`
            : `Fits in VRAM (${model.req_vram_gb}GB needed)`;
    } else {
        return isAppleSilicon
            ? `Requires ${model.req_ram_gb}GB, may struggle`
            : `Will offload to RAM (slow inference)`;
    }
}

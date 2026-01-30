import modelDB from '../data/models.json';

export function analyzeHardware(systemData, userIntent, formFactor = 'laptop') {
    const { mem, graphics, cpu, diskLayout } = systemData;

    // Hardware Specs
    const totalRamGB = mem.total / (1024 * 1024 * 1024);
    const vramGB = graphics.controllers.reduce((acc, gpu) => acc + (gpu.vram || 0), 0) / 1024;

    const isAppleSilicon = cpu.manufacturer.includes('Apple');

    let score = 0;
    let rank = 'Bad';
    let localRecommendations = [];
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

    // --- DATABASE QUERY ---
    localRecommendations = modelDB.filter(model => {
        let fits = false;
        if (isAppleSilicon) {
            fits = totalRamGB >= model.req_ram_gb;
        } else {
            fits = vramGB >= model.req_vram_gb;
        }

        const intentMatch = userIntent === 'chat' ? true : model.tags.includes(userIntent) || model.tags.includes('general');

        return fits && intentMatch && model.min_score <= (score + 10); // +10 buffer
    }).sort((a, b) => b.size_params.localeCompare(a.size_params)).slice(0, 5);

    if (localRecommendations.length === 0) {
        localRecommendations.push(modelDB.find(m => m.id === 'phi-3-mini-128k-q4'));
    }

    return {
        rank,
        score,
        specs: {
            cpu: `${cpu.manufacturer} ${cpu.brand}`,
            ram: `${Math.round(totalRamGB)} GB`,
            gpu: graphics.controllers.map(g => g.model).join(', '),
            vram: isAppleSilicon ? "Unified" : `${Math.round(vramGB)} GB`
        },
        recommendations: localRecommendations,
        warnings
    };
}

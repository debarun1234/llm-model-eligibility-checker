// Quick hardware validation - lightweight check before full scan
export async function quickHardwareCheck() {
    try {
        const result = await window.electronAPI.scanSystem();
        console.log('Quick check full result:', result);

        // scanSystem returns { cpu, mem, graphics, diskLayout, os }
        // Access CPU from the structured result
        const cpuData = result.cpu || result;
        const cpuManufacturer = cpuData.manufacturer || 'Unknown';

        const isAppleSilicon = cpuManufacturer.includes('Apple');

        return {
            isAppleSilicon,
            osType: 'detected',
            cpuBrand: cpuManufacturer
        };
    } catch (error) {
        console.error('Quick check failed:', error);
        return null;
    }
}

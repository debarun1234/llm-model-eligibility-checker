// Quick hardware validation - lightweight check before full scan
export async function quickHardwareCheck() {
    try {
        const result = await window.electronAPI.scanSystem();
        console.log('Quick check full result:', result);

        if (result.status !== 'success' || !result.data) {
            return null;
        }

        // scanSystem returns { status: 'success', data: { cpu, mem, graphics, diskLayout, osInfo } }
        const cpuData = result.data.cpu;
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

import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import systeminformation from 'systeminformation';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        autoHideMenuBar: true,
        backgroundColor: '#1a1a1a', // Match potential dark theme
    });

    const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../dist/index.html')}`;

    mainWindow.loadURL(startUrl);

    if (process.env.ELECTRON_START_URL) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (mainWindow === null) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

// IPC Handlers
ipcMain.handle('scan-system', async () => {
    try {
        const cpu = await systeminformation.cpu();
        const mem = await systeminformation.mem();
        const graphics = await systeminformation.graphics();
        const diskLayout = await systeminformation.diskLayout();
        const osInfo = await systeminformation.osInfo();

        return {
            status: 'success',
            data: {
                cpu,
                mem,
                graphics,
                diskLayout,
                osInfo
            }
        };
    } catch (error) {
        console.error("System Scan Error:", error);
        return { status: 'error', message: error.message };
    }
});

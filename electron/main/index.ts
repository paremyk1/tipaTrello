import { app, BrowserWindow, ipcMain, Menu, Notification, Tray } from 'electron';
import path from 'node:path';
import { boardService } from '../../lib/services/board-service';
let tray: Tray | null = null;
function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    webPreferences: { preload: path.join(__dirname, '../preload/index.js'), contextIsolation: true, nodeIntegration: false }
  });
  void win.loadURL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:3000');
}
app.whenReady().then(() => {
  ipcMain.handle('boards:list', () => boardService.listBoards());
  tray = new Tray(path.join(process.cwd(), 'assets', 'tray.png'));
  tray.setToolTip('TipaTrello');
  Menu.setApplicationMenu(Menu.buildFromTemplate([{ label: 'File', submenu: [{ role: 'quit' }] }]));
  createWindow();
  new Notification({ title: 'TipaTrello', body: 'App is ready' }).show();
});

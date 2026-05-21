import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('electronAPI', {
  boards: { list: () => ipcRenderer.invoke('boards:list') }
});

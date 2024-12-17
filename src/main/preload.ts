// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { SubTask, Task } from './storage';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

contextBridge.exposeInMainWorld('electronAPI', {
  saveTasks: (tasks: Task[]) => ipcRenderer.invoke('save-tasks', tasks),
  getTasks: () => ipcRenderer.invoke('get-tasks'),

  onSaveAndClose: (callback: () => void) => {
    const subscription = () => callback();
    ipcRenderer.on('save-state-and-close', subscription);
    return () => {
      ipcRenderer.removeListener('save-state-and-close', subscription);
    };
  },
  saveCompleted: () => {
    ipcRenderer.send('save-completed');
  },
});
export type ElectronHandler = typeof electronHandler;

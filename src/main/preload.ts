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
  addTask: (task: Task) => ipcRenderer.invoke('add-task', task),
  saveTasks: (tasks: Task[]) => ipcRenderer.invoke('save-tasks', tasks),
  getTasks: () => ipcRenderer.invoke('get-tasks'),
  deleteTask: (index: number) => ipcRenderer.invoke('delete-task', index),
  updateTask: (index: number, task: Task) =>
    ipcRenderer.invoke('update-task', index, task),
  updateTaskName: (index: number, taskName: string) =>
    ipcRenderer.invoke('update-task-name', index, taskName),
  toggleTaskComplete: (index: number) =>
    ipcRenderer.invoke('toggle-task-complete', index),
  addSubTask: (index: number, subTask: SubTask) =>
    ipcRenderer.invoke('add-subTask', index, subTask),
  deleteSubTask: (index: number, subTaskIndex: number) =>
    ipcRenderer.invoke('delete-subTask', index, subTaskIndex),
  toggleSubTaskComplete: (taskIndex: number, subTaskIndex: number) =>
    ipcRenderer.invoke('toggle-subtask-complete', taskIndex, subTaskIndex),
});
export type ElectronHandler = typeof electronHandler;

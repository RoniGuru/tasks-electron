import { ElectronHandler } from '../main/preload';
import { Task } from '../main/storage';

export interface ElectronAPI {
  saveTasks: (tasks: Task[]) => Promise<void>;

  onSaveAndClose: (callback: () => void) => () => void;
  saveCompleted: () => void;
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
    electronAPI: ElectronAPI;
  }
}

export {};

import { ElectronHandler } from '../main/preload';
import { Task } from '../main/storage';

export interface ElectronAPI {
  addTask: (task: Task) => Promise<void>;
  saveTasks: (tasks: Task[]) => Promise<void>;
  getTasks: () => Promise<Task[]>;
  deleteTask: (index: number) => Promise<void>;
  updateTask: (index: number, task: Task) => Promise<void>;
  toggleTaskComplete: (index: number) => Promise<void>;
  toggleSubTaskComplete: (
    taskIndex: number,
    subTaskIndex: number,
  ) => Promise<void>;
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
    electronAPI: ElectronAPI;
  }
}

export {};

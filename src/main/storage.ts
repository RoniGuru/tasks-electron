import { app } from 'electron';
import * as path from 'path';
import * as fs from 'fs/promises';

export interface SubTask {
  name: string;
  completed: boolean;
}

export interface Task {
  name: string;
  completed: boolean;
  color: string;
  subTasks: SubTask[];
}

export class TaskStorage {
  private filePath: string;

  constructor() {
    this.filePath = path.join(app.getPath('userData'), 'tasks.json');
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(tasks, null, 2));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }

  async loadTasks(): Promise<Task[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async addTask(task: Task): Promise<void> {
    const tasks = await this.loadTasks();
    tasks.push(task);
    await this.saveTasks(tasks);
  }

  async deleteTask(index: number): Promise<void> {
    const tasks = await this.loadTasks();
    tasks.splice(index, 1);
    await this.saveTasks(tasks);
  }

  async updateTask(index: number, updatedTask: Task): Promise<void> {
    const tasks = await this.loadTasks();
    tasks[index] = updatedTask;
    await this.saveTasks(tasks);
  }

  async updateTaskName(index: number, updatedTaskName: string): Promise<void> {
    const tasks = await this.loadTasks();
    tasks[index].name = updatedTaskName;
    await this.saveTasks(tasks);
  }

  async toggleTaskComplete(index: number): Promise<void> {
    const tasks = await this.loadTasks();
    tasks[index].completed = !tasks[index].completed;
    await this.saveTasks(tasks);
  }

  async addSubTask(index: number, subTask: SubTask) {
    const tasks = await this.loadTasks();
    tasks[index].subTasks.push(subTask);
    await this.saveTasks(tasks);
  }

  async deleteSubTask(index: number, subTaskIndex: number) {
    const tasks = await this.loadTasks();
    tasks[index].subTasks.splice(subTaskIndex, 1);
    await this.saveTasks(tasks);
  }

  async toggleSubTaskComplete(
    taskIndex: number,
    subTaskIndex: number,
  ): Promise<void> {
    const tasks = await this.loadTasks();
    tasks[taskIndex].subTasks[subTaskIndex].completed =
      !tasks[taskIndex].subTasks[subTaskIndex].completed;
    await this.saveTasks(tasks);
  }
}

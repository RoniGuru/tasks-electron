import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Task, SubTask } from '../../../main/storage';

interface StartState {
  tasks: Task[];
}

const initialState: StartState = {
  tasks: [],
};

export const loadTasks = createAsyncThunk('task/load', async () => {
  const tasks = await window.electronAPI.getTasks();

  return tasks;
});

export const saveTasks = createAsyncThunk(
  'task/save',
  async (_, { getState }) => {
    const state = getState() as { task: StartState };
    const tasks = state.task.tasks;

    await window.electronAPI.saveTasks(tasks);
  },
);

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{ name: string; color: string }>,
    ) => {
      const { name, color } = action.payload;

      const newTask: Task = { name, completed: false, color, subTasks: [] };

      state.tasks.push(newTask);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.tasks.splice(index, 1);
    },
    updateTask: (
      state,
      action: PayloadAction<{ index: number; newTask: Task }>,
    ) => {
      const { index, newTask } = action.payload;
      state.tasks[index] = newTask;
    },
    addSubTask: (
      state,
      action: PayloadAction<{ index: number; name: string }>,
    ) => {
      const { index, name } = action.payload;
      state.tasks[index].subTasks.push({ name, completed: false });
    },
    deleteSubTask: (
      state,
      action: PayloadAction<{ index: number; subIndex: number }>,
    ) => {
      const { index, subIndex } = action.payload;
      state.tasks[index].subTasks.splice(subIndex, 1);
    },
    updateSubTask: (
      state,
      action: PayloadAction<{
        index: number;
        subIndex: number;
        newName: string;
      }>,
    ) => {
      const { index, subIndex, newName } = action.payload;
      state.tasks[index].subTasks[subIndex].name = newName;
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const index = action.payload;

      state.tasks[index].completed = !state.tasks[index].completed;
    },
    toggleSubTask: (
      state,
      action: PayloadAction<{ index: number; subIndex: number }>,
    ) => {
      const { index, subIndex } = action.payload;
      state.tasks[index].subTasks[subIndex].completed =
        !state.tasks[index].subTasks[subIndex].completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loadTasks.fulfilled,
        (state, action: PayloadAction<Task[] | null>) => {
          if (action.payload) {
            state.tasks = action.payload;
          }
        },
      )
      .addCase(saveTasks.fulfilled, (state) => {});
  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  deleteSubTask,
  addSubTask,
  updateSubTask,
  toggleSubTask,
  toggleTask,
} = taskSlice.actions;
export default taskSlice.reducer;

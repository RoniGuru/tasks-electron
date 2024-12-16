import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { Task } from '../../main/storage';
import { addTask } from '../state/Task/taskSlice';

function TaskForm() {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskColor, setNewTaskColor] = useState('#000000');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    const newTask: Task = {
      name: newTaskName,
      color: newTaskColor,
      completed: false,
      subTasks: [],
    };

    dispatch(addTask(newTask));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        placeholder="Enter task name"
      />
      <input
        type="color"
        value={newTaskColor}
        onChange={(e) => setNewTaskColor(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;

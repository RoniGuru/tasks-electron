import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { Task } from '../../main/storage';
import { addTask } from '../state/Task/taskSlice';
import { FaRegSquarePlus } from 'react-icons/fa6';

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
    <form onSubmit={handleSubmit} className="taskForm">
      <input
        type="text"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        placeholder="Enter task name"
        className="input"
      />
      <input
        type="color"
        value={newTaskColor}
        onChange={(e) => setNewTaskColor(e.target.value)}
        style={{
          width: '80px',
          height: '80px',
          padding: 0,
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: 'none',
        }}
      />

      <button
        type="submit"
        className="icon"
        style={{
          border: 'none',
          background: 'none',
          cursor: 'pointer',

          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <FaRegSquarePlus style={{ height: '80px', width: '80px' }} />
      </button>
    </form>
  );
}

export default TaskForm;

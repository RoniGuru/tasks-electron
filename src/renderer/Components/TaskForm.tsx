import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { Task } from '../../main/storage';
import { addTask } from '../state/Task/taskSlice';
import { FaRegSquarePlus } from 'react-icons/fa6';

const colors = [
  ['#1f77b4', 'Blue'],
  ['#2ca02c', 'Green'],
  ['#ff7f0e', 'Orange'],
  ['#d62728', 'Red'],
  ['#9467bd', 'Purple'],
  ['#17becf', 'Teal'],
];

function TaskForm() {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskColor, setNewTaskColor] = useState(colors[0][0]);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    if (newTaskName.length > 30) {
      alert('Name is longer than 30 characters');
      return;
    }

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
      <select
        value={colors[0]}
        style={{
          backgroundColor: newTaskColor,
          color: newTaskColor,
        }}
        className="colorPicker"
        onChange={(e) => setNewTaskColor(e.target.value)}
      >
        {colors.map((color) => (
          <option
            key={color[0]}
            value={color[0]}
            style={{
              backgroundColor: color[0],
              color: color[0],
            }}
          >
            {color[1]}
          </option>
        ))}
      </select>

      {/* <input
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
      /> */}

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

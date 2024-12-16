import { Task } from '../../main/storage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import {
  updateTask,
  toggleTask,
  deleteTask,
  deleteSubTask,
  toggleSubTask,
} from '../state/Task/taskSlice';
import SubTaskForm from './SubTaskForm';

function Task({ task, index }: { task: Task; index: number }) {
  const [editText, setEditText] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Enter') {
      if (!editText.trim()) return;
      setIsEditing(false);
      const newTask = {
        ...task,
        name: editText,
      };
      dispatch(updateTask({ index, newTask }));

      setEditText('');
    }
  };

  return (
    <div style={{ backgroundColor: task.color, padding: 20 }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleTask(index))}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
          autoFocus
        />
      ) : (
        <span
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
          }}
          onDoubleClick={() => {
            setIsEditing(true);
            setEditText(task.name);
          }}
        >
          {task.name}
        </span>
      )}
      <ul>
        <SubTaskForm index={index} />
        {task.subTasks.map((subTask, subIndex) => (
          <li key={subIndex}>
            <input
              type="checkbox"
              checked={subTask.completed}
              onChange={() => dispatch(toggleSubTask({ index, subIndex }))}
            />
            <span
              style={{
                textDecoration: subTask.completed ? 'line-through' : 'none',
              }}
            >
              {subTask.name}
            </span>
            <button
              onClick={() => dispatch(deleteSubTask({ index, subIndex }))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(deleteTask(index))}>Delete</button>
    </div>
  );
}

export default Task;

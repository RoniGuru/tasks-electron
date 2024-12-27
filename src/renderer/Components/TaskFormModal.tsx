import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { Task } from '../../main/storage';
import { addTask } from '../state/Task/taskSlice';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { IoCloseCircle } from 'react-icons/io5';

const colors = [
  ['#1f77b4', 'Blue'],
  ['#2ca02c', 'Green'],
  ['#ff7f0e', 'Orange'],
  ['#d62728', 'Red'],
  ['#9467bd', 'Purple'],
  ['#17becf', 'Teal'],
];

function TaskFormModal() {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskColor, setNewTaskColor] = useState(colors[0][1]);
  const [modal, setModal] = useState(false);
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

    setModal(false);
    setNewTaskColor(colors[0][1]);
    setNewTaskName('');
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button onClick={() => setModal(true)} className="button">
        create task
      </button>

      <div
        className="modalBackground"
        onClick={() => setModal(!modal)}
        style={{
          opacity: modal ? 1 : 0,
          pointerEvents: modal ? 'auto' : 'none',
          transition: 'all 0.5s ease-out',
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="taskFormModal"
          style={{
            opacity: modal ? 1 : 0,
            position: 'absolute',
            pointerEvents: modal ? 'auto' : 'none',

            transition: 'all 0.5s ease-out',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setModal(!modal)}
            style={{
              justifyContent: 'center',
              alignSelf: 'flex-end',
            }}
            className="icon"
          >
            <IoCloseCircle style={{ height: '30px', width: '30px' }} />
          </button>

          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Enter task name"
            className="input"
          />
          <div className="colorButtonsContainer">
            {colors.map((color) => (
              <button
                key={color[0]}
                style={{
                  backgroundColor: color[0],
                  color: color[0],
                  opacity: newTaskColor === color[1] ? '100%' : '40%',
                }}
                className="colorButton"
                onClick={() => setNewTaskColor(color[1])}
              >
                {color[1]}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="icon"
            style={{
              justifyContent: 'center',
            }}
          >
            <FaRegSquarePlus style={{ height: '80px', width: '80px' }} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormModal;

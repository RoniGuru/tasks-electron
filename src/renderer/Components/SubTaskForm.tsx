import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { addSubTask } from '../state/Task/taskSlice';
import { FaRegSquarePlus } from 'react-icons/fa6';

function SubTaskForm({ index }: { index: number }) {
  const [name, setName] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const handleSubTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    dispatch(addSubTask({ index, name }));
  };

  return (
    <form onSubmit={handleSubTaskSubmit} className="subTaskForm">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter subTask name"
      />
      <button
        type="submit"
        style={{
          border: 'none',
          background: 'none',
          cursor: 'pointer',

          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <FaRegSquarePlus className="icon" size={25} />
      </button>
    </form>
  );
}

export default SubTaskForm;

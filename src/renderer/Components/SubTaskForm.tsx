import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { SubTask } from '../../main/storage';
import { addSubTask } from '../state/Task/taskSlice';

function SubTaskForm({ index }: { index: number }) {
  const [name, setName] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const handleSubTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    dispatch(addSubTask({ index, name }));
  };

  return (
    <form onSubmit={handleSubTaskSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter subTask name"
      />
      <button type="submit">Add SubTask</button>{' '}
    </form>
  );
}

export default SubTaskForm;

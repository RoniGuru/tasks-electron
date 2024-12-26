import { useEffect, useState } from 'react';
import { RootState, AppDispatch } from './state/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks, saveTasks } from './state/Task/taskSlice';

import TaskCard from './Components/Task';
import { IoIosSave } from 'react-icons/io';
import SearchBar from './Components/SearchBar';
import TaskFormModal from './Components/TaskFormModal';

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.task.tasks);

  const [filter, setFilter] = useState<boolean | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  useEffect(() => {
    // Set up save-and-close handler
    const unsubscribe = window.electronAPI.onSaveAndClose(async () => {
      try {
        // Dispatch save action and wait for it to complete
        await dispatch(saveTasks()).unwrap();
        // Notify main process that save is complete
        window.electronAPI.saveCompleted();
      } catch (error) {
        console.error('Error saving tasks:', error);
        // Still notify completion even if save fails
        window.electronAPI.saveCompleted();
      }
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="home">
      <button onClick={() => dispatch(saveTasks())} className="saveButton">
        Save <IoIosSave />
      </button>
      <TaskFormModal />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="tasksFilterButtons">
        <button
          onClick={() => setFilter(null)}
          style={{ opacity: filter === null ? '60%' : '100%' }}
        >
          All
        </button>
        <button
          onClick={() => setFilter(true)}
          style={{ opacity: filter ? '60%' : '100%' }}
        >
          completed
        </button>
        <button
          onClick={() => setFilter(false)}
          style={{ opacity: !filter ? '60%' : '100%' }}
        >
          not completed
        </button>
      </div>
      <div className="tasksContainer">
        {searchTerm.length > 0
          ? tasks
              .filter((task) => task.name.includes(searchTerm))
              .map((task, index) => (
                <TaskCard key={index} task={task} index={index} />
              ))
          : filter == null
            ? tasks.map((task, index) => (
                <TaskCard key={index} task={task} index={index} />
              ))
            : tasks
                .filter((task) => task.completed === filter) // Assuming you want to filter by completion status
                .map((task, index) => (
                  <TaskCard key={index} task={task} index={index} />
                ))}
      </div>
    </div>
  );
}

export default Home;

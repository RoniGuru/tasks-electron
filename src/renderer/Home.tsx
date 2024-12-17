import { useEffect } from 'react';
import { RootState, AppDispatch } from './state/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks, saveTasks } from './state/Task/taskSlice';
import TaskForm from './Components/TaskForm';
import Task from './Components/Task';
import { IoIosSave } from 'react-icons/io';

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.task.tasks);
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
      <TaskForm />
      <div className="tasksContainer">
        {tasks.map((task, index) => (
          <Task key={index} task={task} index={index} />
        ))}
      </div>

      <button onClick={() => dispatch(saveTasks())}>
        Save Button <IoIosSave />
      </button>
    </div>
  );
}

export default Home;

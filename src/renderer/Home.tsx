import { useEffect } from 'react';
import { RootState, AppDispatch } from './state/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks } from './state/Task/taskSlice';
import TaskForm from './Components/TaskForm';
function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.task.tasks);
  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  return (
    <div>
      <TaskForm />
      <div style={{ flex: 'col' }}>
        {tasks.map((task, index) => (
          <div key={index}>
            {task.name} + {index}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

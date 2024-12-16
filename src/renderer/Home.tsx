import { useEffect } from 'react';
import { RootState, AppDispatch } from './state/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks, saveTasks } from './state/Task/taskSlice';
import TaskForm from './Components/TaskForm';
import Task from './Components/Task';
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
          <Task key={index} task={task} index={index} />
        ))}
      </div>

      <button onClick={() => dispatch(saveTasks())}>Save Button</button>
    </div>
  );
}

export default Home;

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './Home';
import TaskFormModal from './Components/TaskFormModal';

function Test() {
  return (
    <div>
      <TaskFormModal />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

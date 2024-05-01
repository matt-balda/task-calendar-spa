import { useEffect, useState } from 'react'
import axios from "axios";
import Task from '../components/Task.jsx'
import TaskForm from '../components/TaskForm.jsx';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3008/tasks/list');
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className='app'>
      <h1>Tasks list</h1>
      <div className='tasks-list'>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
      <TaskForm />
    </div>
  );
}

export default App

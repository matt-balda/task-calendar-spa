// imports libraries
import { useEffect, useState } from "react";
import axios from "axios";

// imports styles
import "./App.css";

// imports components
import Task from "../components/Task.jsx";
import TaskForm from "../components/TaskForm.jsx";
import Search from "../components/Search.jsx";
import Filter from "../components/Filter.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("Asc");

  useEffect(() => {
    fetchAllData();
  }, [tasks], [filter==="all"]);

  const fetchAllData = async () => {
    try {
      const response = await axios.get("http://localhost:3008/tasks/list");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const completeTask = async (id) => {
    try {
      await axios.patch(`http://localhost:3008/tasks/update/${id}`, {
        isCompleted: !tasks.find((task) => task.id === id).isCompleted,
      });
    } catch (error) {
      console.error("Error completing task: ", error);
    }
  }
  
  return (
    <div className="app">
      <h1>Tasks list</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} setTasks={setTasks} />
      <div className="tasks-list">
        {tasks.length === 0 ? (
          <div className="no-tasks-container">
            <p className="no-tasks-title">No tasks</p>
            <p className="no-tasks-description">
              There are no tasks available at the moment
            </p>
          </div>
        ) : (
          tasks
            .filter((task) => filter === "all" ? true : filter === "complete" ? task.isCompleted : !task.isCompleted)
            .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => sort === "Asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title))
            .map((task) => <Task key={task.id} task={task} completeTask={completeTask} />)
        )}
      </div>
      <TaskForm />
    </div>
  );
}

export default App;

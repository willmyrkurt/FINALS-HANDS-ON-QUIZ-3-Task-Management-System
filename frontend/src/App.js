import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch Tasks
  useEffect(() => {
    fetch(`${API_URL}/tasks/`) 
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  // Add Task
  const addTask = () => {
    fetch(`${API_URL}/tasks/`, {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        is_completed: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]);
        setTitle("");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Management System</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>
        Add Task
      </button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import { useState } from "react";
import axios from "axios";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !setDate) return;

    try {
        await axios.post("http://localhost:3008/tasks/new", {
          title: title,
          description: description,
          date: date + '.700Z',
          duration: parseInt(duration),
          category: category
        });
        console.log("Form sent successfully!");
        setTitle("");
        setDescription("");
        setDate("");
        setDuration("");
        setCategory("");
      } catch (error) {
        console.error("Error sending form:", error);
      }
  };

  return (
    <div className="task-form">
      <h2>New task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="datetime-local"
          value={date}
          step={1}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          min="0"
          placeholder="Enter its duration in hours"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled selected>Category</option>
          <option value="work">Work</option>
          <option value="study">Study</option>
          <option value="personal">Personal</option>
        </select>
        <button type="submit">Add task</button>
      </form>
    </div>
  );
}

export default TaskForm;

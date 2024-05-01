import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

const Task = ({ task }) => {
  // date formatting
  const dateString = task.date.slice(0, -5);
  const dateFormated = moment(dateString).format("DD/MM/YYYY");
  const timeFormated = moment(dateString).format("HH:mm:ss");

  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3008/tasks/delete/${task.id}`)
      .catch((error) => {
        console.error("Erro ao excluir a tarefa:", error);
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:3008/tasks/update/${task.id}`, {
        title: title,
        description: description,
        date: date + ".700Z",
        duration: parseInt(duration),
        category: category,
      });
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  };

  const handleId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3008/tasks/${task.id}`
      );
      setTaskData(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setDate(response.data.date.slice(0, -5));
      setDuration(response.data.duration);
      setCategory(response.data.category);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao acessar os dados da tarefa:", error);
    }
  };

  return (
    <div key={task.id} className="task">
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>{dateFormated} - {timeFormated}</p>
      <p>{task.duration}</p>
      <p className="category">({task.category})</p>
      {/* <input type="checkbox" checked={task.isCompleted} /> */}
      <div>
        <button className="done">Done</button>
        <button className="update" onClick={handleId}>
          Update
        </button>
        <button className="remove" onClick={handleDelete}>
          X
        </button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <div className="task-form">
              <h2>Update task#{task.id}</h2>
              <form onSubmit={handleUpdate}>
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
                  <option disabled>Category</option>
                  <option value="work">Work</option>
                  <option value="study">Study</option>
                  <option value="personal">Personal</option>
                </select>
                <button type="submit">Update task</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;

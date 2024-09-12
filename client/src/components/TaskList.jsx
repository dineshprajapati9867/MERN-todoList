import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [highlightedTaskIds, setHighlightedTaskIds] = useState([]);

  // Fetch all tasks
  useEffect(() => {
<<<<<<< HEAD
    fetch("https://mern-todo-list-nine.vercel.app/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleSave = () => {
    fetch("https://mern-todo-list-nine.vercel.app/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
=======
    axios
      .get("https://mern-todolist-743c.onrender.com/tasks")
      .then((response) => setTasks(response.data));
  }, []);

  const handleSave = () => {
    axios
      .get("https://mern-todolist-743c.onrender.com/tasks")
      .then((response) => setTasks(response.data));
>>>>>>> c0d275dd21a48eb5562ecc7fd0af6e7723c1ca17
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = (id) => {
<<<<<<< HEAD
    fetch(`https://mern-todo-list-nine.vercel.app/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => handleSave())
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleComplete = (task) => {
    fetch(`https://mern-todo-list-nine.vercel.app/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, completed: !task.completed }),
    })
=======
    axios.delete(`https://mern-todolist-743c.onrender.com/${id}`).then(() => handleSave());
  };

  const handleComplete = (task) => {
    axios
      .put(`https://mern-todolist-743c.onrender.com/${task._id}`, {
        ...task,
        completed: !task.completed,
      })
>>>>>>> c0d275dd21a48eb5562ecc7fd0af6e7723c1ca17
      .then(() => {
        handleSave();
        if (task.completed) {
          setHighlightedTaskIds((prev) => prev.filter((id) => id !== task._id));
        } else {
          setHighlightedTaskIds((prev) => [...prev, task._id]);
        }
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <div>
      <TaskForm task={editingTask} onSave={handleSave} />
      <ul className="mt-1 max-w-4xl mx-auto p-4 space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-white shadow-md rounded-lg transition-opacity duration-300 ${
              task.completed ? "opacity-50" : ""
            }`}
          >
            {highlightedTaskIds.includes(task._id) ? (
              <div className="flex flex-col sm:flex-row justify-between w-full">
                <div>
                  <del className="text-lg font-semibold">{task.title}</del>
                  <br />
                  <del>{task.description}</del>
                </div>
                <div className="mt-2 sm:mt-0 flex space-x-2">
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors max-h-10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-between w-full">
                <div>
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <div className="mt-2 sm:mt-0 flex space-x-2">
                  <button
                    onClick={() => handleComplete(task)}
                    className="px-2 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors max-h-10"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleEdit(task)}
                    className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors max-h-10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors max-h-10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

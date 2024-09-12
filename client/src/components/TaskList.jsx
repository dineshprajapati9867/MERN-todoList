import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [highlightedTaskIds, setHighlightedTaskIds] = useState([]);

  // Fetch all tasks
  useEffect(() => {
    handleSave();
  }, []);

  const handleSave = () => {
    fetch("https://mern-todolist-743c.onrender.com/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = (id) => {
    fetch(`https://mern-todolist-743c.onrender.com/${id}`, {
      method: "DELETE",
    })
      .then(() => handleSave())
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleComplete = (task) => {
    fetch(`https://mern-todolist-743c.onrender.com/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, completed: !task.completed }),
    })
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
    <>
      <TaskForm task={editingTask} onSave={handleSave} />
      <ul className="lg:max-w-4xl mx-auto p-4 space-y-1">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white shadow-md rounded-lg transition-opacity duration-300 ${
              task.completed ? "opacity-50" : ""
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-between w-full">
              <div className="flex-1">
                {highlightedTaskIds.includes(task._id) ? (
                  <div>
                    <del className="text-lg font-semibold">{task.title}</del>
                    <p><del>{task.description}</del></p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p>{task.description}</p>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                {highlightedTaskIds.includes(task._id) ? (
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors lg:max-h-10 lg:min-w-14"
                  >
                    Delete
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleComplete(task)}
                      className="px-2 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors lg:max-h-10 lg:min-w-14"
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button
                      onClick={() => handleEdit(task)}
                      className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors lg:max-h-10 lg:min-w-14"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors lg:max-h-10 lg:min-w-14"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;

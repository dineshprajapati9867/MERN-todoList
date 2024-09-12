import { useState, useEffect } from "react";

const TaskForm = ({ task, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description };

    try {
      if (task) {
        // PUT request to update the task
        const response = await fetch(
          `https://mern-todo-list-nine.vercel.app/tasks/${task._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update task");
        }
      } else {
        // POST request to create a new task
        const response = await fetch("https://mern-todo-list-nine.vercel.app/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        });
        setTitle("");
        setDescription("");

        if (!response.ok) {
          throw new Error("Failed to add task");
        }
      }

      onSave(); // Call onSave to update the task list
    } catch (error) {
      console.error(error.message);
    if (task) {
      axios.put(`https://mern-todolist-743c.onrender.com/${task._id}`, taskData)
        .then(() => onSave())
        .catch((err) => console.error(err));
    } else {
      axios.post('https://mern-todolist-743c.onrender.com/tasks', taskData)
        .then(() => onSave())
        .catch((err) => console.error(err));

    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {task ? "Edit Task" : "Add New Task"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task description"
            rows="4"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {task ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};
}
export default TaskForm;

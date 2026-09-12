import { useState } from "react";

const Column = ({
  title,
  status,
  tasks,
  handleDragOver,
  handleDrop,
  handleDragStart
}) => {

  return (
    <div
      className="bg-white rounded-xl shadow-md p-5 min-h-[400px]"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, status)}
    >

      <h2 className="text-xl font-bold mb-5">
        {title}
      </h2>

      <div className="space-y-3">

        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
              className="
                bg-gray-50
                border
                rounded-lg
                p-4
                cursor-grab
                hover:shadow-md
                transition
                select-none
              "
            >
              {task.title}
            </div>
          ))}

      </div>

    </div>
  );
};


const DragAndDrop = () => {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn React",
      status: "todo"
    },
    {
      id: 2,
      title: "Learn Node",
      status: "todo"
    },
    {
      id: 3,
      title: "Build Project",
      status: "todo"
    }
  ]);



  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, zone) => {

    const taskId = e.dataTransfer.getData("taskId");
    if (!taskId) {
      return;
    }

    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === Number(taskId)) {
          return {
            ...task,
            status: zone
          };
        }
        return task;
      });
    });
  };

  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleAddTask = () => {
    if (!input.trim()) return;

    const newTask = {
      id: tasks.length + 1,
      title: input.trim(),
      status: "todo"
    };

    setTasks((prevTasks) => [
      ...prevTasks,
      newTask
    ]);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-center mb-8">
        Drag & Drop Task Board
      </h1>

      <div className="max-w-6xl mx-auto mb-8">
        <input
          className="w-full p-3 rounded-lg border border-gray-300"
          type="text"
          placeholder="Enter task"
          value={input}
          onChange={handleInput}
        />

        <button
          onClick={handleAddTask}
          className="mt-2 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        <Column
          title="Todo"
          status="todo"
          tasks={tasks}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
        />

        <Column
          title="Completed"
          status="completed"
          tasks={tasks}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
        />

      </div>

    </div>
  );
};

export default DragAndDrop;
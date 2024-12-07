import { useState } from "react";

export default function NewTask({ onAddTask }) {
  const [enteredTask, setEnteredTask] = useState("");

  const handleclick = () => {
    if (enteredTask.trim() === "") return;
    onAddTask(enteredTask);
    setEnteredTask("");
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 border-b-2 focus:outline-none focus:border-stone-600 rounded-sm bg-stone-200"
        onChange={(e) => setEnteredTask(e.target.value)}
        value={enteredTask}
      />
      <button
        className="text-slate-700 hover:text-stone-950"
        onClick={handleclick}
      >
        Add Task
      </button>
    </div>
  );
}

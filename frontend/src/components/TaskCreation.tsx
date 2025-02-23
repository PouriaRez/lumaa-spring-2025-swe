import React, { useState } from "react";
import { createTask } from "../services/taskServices";

interface modalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const TaskCreation = ({ isOpen, closeModal }: modalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTaskCreation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setErr("A title is required.");
      return;
    }

    setLoading(true);
    try {
      const taskData = { title, description };
      await createTask(taskData);
      //if Success, reset the state of the form
      closeModal();
      setTitle("");
      setDescription("");
      setErr("");
    } catch (err) {
      console.error("Failed to create task: ", err);
      setErr("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  // If modal is not open display nothing
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-75 flex flex-col items-center pt-5 z-10">
        <form onSubmit={handleTaskCreation} className="flex flex-col ">
          <input
            type="text"
            placeholder="Title"
            className="w-100 h-20 text-2xl text-white "
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="description"
            placeholder="Description"
            className="w-100 h-20 text-2xl text-white "
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-between mt-5">
            <button onClick={closeModal}>Cancel</button>
            <button type="submit" disabled={loading}>
              {loading ? "Creating Task..." : "Create Task"}
            </button>
          </div>
          {err && <p>{err}</p>}
        </form>
      </div>
    </>
  );
};

export default TaskCreation;

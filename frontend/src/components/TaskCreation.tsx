import React, { useState } from "react";
import { createTask } from "../services/taskServices";

interface modalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const TaskCreation = ({ isOpen, closeModal }: modalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(" ");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTaskCreation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setErr("A title is required.");
      return;
    }

    if (description === "") {
      console.log("is empty string??");
      setDescription("");
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

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription === "" ? " " : newDescription);
  };

  // If modal is not open display nothing
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/85 bg-opacity-75 flex items-center justify-center z-10">
        <form
          onSubmit={handleTaskCreation}
          className="flex flex-col bg-gray-500/50 p-6 rounded-lg w-1/3 "
        >
          <input
            type="text"
            placeholder="Title"
            className="w-full h-20 text-3xl  p-2 mb-2 border rounded"
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full h-20  p-2 mb-2 border rounded text-xl text-white max-h-59"
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
          {err && <p className="text-red-500">{err}</p>}

          <div className="flex justify-between mt-5">
            <button onClick={closeModal}>Cancel</button>
            <button type="submit" disabled={loading}>
              {loading ? "Creating Task..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskCreation;

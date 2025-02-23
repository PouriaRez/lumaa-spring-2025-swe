import React, { useState } from "react";
import { updateTask } from "../services/taskServices";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  task: { id: number; title: string; description: string; iscomplete: boolean };
  onEdit: (task: {
    id: number;
    title: string;
    description: string;
    iscomplete: boolean;
  }) => void;
}

const EditTaskModal = ({ isOpen, closeModal, task, onEdit }: ModalProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || " ");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTaskEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setErr("A title is required.");
      return;
    }
    setLoading(true);
    try {
      const updatedTask = { ...task, title, description };
      await updateTask(task.id, updatedTask);
      onEdit(updatedTask);
      closeModal();
    } catch (err) {
      console.error("Failed to edit task: ", err);
      setErr("Failed to edit task.");
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 bg-opacity-75 flex items-center justify-center z-10">
      <form
        onSubmit={handleTaskEdit}
        className="bg-gray-500/50 p-6 rounded-lg w-1/3"
      >
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full h-20 text-3xl  p-2 mb-2 border rounded"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full h-20  p-2 mb-2 border rounded text-xl text-white max-h-59"
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
        />
        {err && <p className="text-red-500">{err}</p>}
        <div className="flex justify-between mt-5">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskModal;

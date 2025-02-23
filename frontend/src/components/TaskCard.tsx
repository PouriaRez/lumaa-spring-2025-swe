import { useState } from "react";
import { deleteTask, updateTask } from "../services/taskServices";

interface cardProps {
  task: { id: number; title: string; description: string; iscomplete: boolean };
  onEdit: (task: {
    id: number;
    title: string;
    description: string;
    iscomplete: boolean;
  }) => void;
  onDelete: (id: number) => void;
}

const TaskCard = ({ task, onEdit, onDelete }: cardProps) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleDelete = async (taskID: number) => {
    setLoading(true);
    try {
      await deleteTask(taskID);
      onDelete(taskID);
    } catch (err) {
      console.error("Failed to delete task: ", err);
      setErr("Failed to delete task.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (task: {
    id: number;
    title: string;
    description: string;
    iscomplete: boolean;
  }) => {
    try {
      await updateTask(task.id, task);
      onEdit(task);
    } catch (err) {
      console.error("Failed to edit task: ", err);
      setErr("Failed to edit task.");
    }
  };

  return (
    <>
      <div className="flex flex-row bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 opacity-90 rounded-2xl">
        <div className=" flex flex-col justify-center items-start w-full h-5/12 rounded-sm flex-wrap">
          <p className="p-3 text-3xl font-bold">{task.title}</p>
          <p className="pl-5 text-start font-light">{task?.description}</p>
        </div>
        <div className="h-full flex flex-col justify-between">
          <button className=" w-full font" onClick={() => handleEdit(task)}>
            <p className="font-light">Edit</p>
          </button>
          <input className="" type="checkbox" />
          <button
            className="pl-5 w-full font-light text-red-700"
            onClick={() => handleDelete(task.id)}
            disabled={loading}
          >
            {loading ? (
              <p className="font-bold">Deleting...</p>
            ) : (
              <p className="font-bold">Delete</p>
            )}
          </button>
        </div>
        {err && <div className="error">{err}</div>}
      </div>
    </>
  );
};

export default TaskCard;

import { useState } from "react";
import { deleteTask, updateTask } from "../services/taskServices";
import EditTaskModal from "./EditTaskComponent";

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
  const [isEditOpen, setIsEditOpen] = useState(false);
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

  const handleCheckBoxChange = async () => {
    const updatedTask = { ...task, iscomplete: !task.iscomplete };
    try {
      await updateTask(updatedTask.id, updatedTask);
      onEdit(updatedTask);
    } catch (error) {
      console.error("Failed to update task: ", error);
      setErr("Failed to update task.");
    }
  };

  return task.iscomplete ? (
    <>
      <div className="flex flex-row justify-center items-center bg-gray-500/40 rounded-xl max-w-300 w-300 p-1">
        <input
          className="w-6 h-6"
          type="checkbox"
          checked={task.iscomplete}
          onChange={handleCheckBoxChange}
        />
        <div className=" flex flex-col justify-center items-start w-full h-5/12 rounded-sm flex-wrap">
          <p className="p-3 text-3xl font-bold line-through">{task.title}</p>
          <p className="pl-5 text-start font-light">{task?.description}</p>
        </div>
        <div className=" flex gap-1">
          <button className=" w-full h-30" onClick={() => setIsEditOpen(true)}>
            <p className="font-light">Edit</p>
          </button>
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
      </div>
      {err && <div className="error">{err}</div>}

      <EditTaskModal
        isOpen={isEditOpen}
        closeModal={() => setIsEditOpen(false)}
        task={task}
        onEdit={onEdit}
      />
    </>
  ) : (
    <>
      <div className="flex flex-row justify-center items-center bg-gray-500/40 rounded-xl max-w-300 w-300 p-1">
        <input
          className="w-6 h-6"
          type="checkbox"
          checked={task.iscomplete}
          onChange={handleCheckBoxChange}
        />
        <div className="flex flex-col justify-center items-start w-full h-5/12 rounded-sm flex-wrap">
          <p className="p-3 text-3xl font-bold ">{task.title}</p>
          <p className="pl-5 text-start font-light">{task?.description}</p>
        </div>
        <div className=" flex gap-1">
          <button className=" w-full h-30" onClick={() => setIsEditOpen(true)}>
            <p className="font-light">Edit</p>
          </button>
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
      </div>
      {err && <div className="error">{err}</div>}

      <EditTaskModal
        isOpen={isEditOpen}
        closeModal={() => setIsEditOpen(false)}
        task={task}
        onEdit={onEdit}
      />
    </>
  );
};

export default TaskCard;

import { useEffect, useState } from "react";
import { retrieveTasks } from "../services/taskServices";
import TaskCard from "./TaskCard";

interface Task {
  id: number;
  title: string;
  description: string;
  iscomplete: boolean;
}

interface TaskListProps {
  taskCreated: boolean;
}

const TaskList = ({ taskCreated }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [err, setErr] = useState<string>("");

  const fetchTasks = async () => {
    try {
      const taskData = await retrieveTasks();
      setTasks(taskData as Task[]);
    } catch (err) {
      console.error("Failed to load tasks: ", err);
      setErr("Failed to load tasks.");
    }
  };

  const handleUpdate = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, [taskCreated]);

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  if (err) {
    return <div>{err}</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-2 ">
        {tasks.length === 0 ? (
          <div>You have no tasks!</div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => handleUpdate(task)}
              onDelete={() => handleDelete(task.id)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default TaskList;

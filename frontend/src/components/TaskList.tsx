import { useEffect, useState } from "react";
import { retrieveTasks } from "../services/taskServices";
import { OrbitProgress } from "react-loading-indicators";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const taskData = await retrieveTasks();
      setTasks(taskData as Task[]);
    } catch (err) {
      console.error("Failed to load tasks: ", err);
      setErr("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [taskCreated]);

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUpdate = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  if (loading) {
    return <OrbitProgress variant="disc" color="#ffffff" size="large" />;
  }

  if (err) {
    return <div>{err}</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-2 ">
        <h1>Tasks:</h1>
        {tasks.length === 0 ? (
          <div>You have no tasks!</div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => handleUpdate(task.id)}
              onDelete={() => handleDelete(task.id)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default TaskList;

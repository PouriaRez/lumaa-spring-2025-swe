import { useEffect, useState } from "react";
import { logout } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import TaskCreation from "../components/TaskCreation";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const [taskCreationModal, setTaskCreationModal] = useState(false);
  const [taskCreated, setTaskCreated] = useState(false);
  const nav = useNavigate();

  const openTaskModal = () => setTaskCreationModal(true);
  const closeTaskModal = () => {
    setTaskCreationModal(false);
    setTaskCreated(true);
  };

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  useEffect(() => {
    if (taskCreated) {
      setTaskCreated(false);
    }
  }, [taskCreated]);

  return (
    <>
      <div className="flex flex-col">
        <TaskCreation isOpen={taskCreationModal} closeModal={closeTaskModal} />
        <TaskList taskCreated={taskCreated} />
        <button className="mt-5" onClick={openTaskModal}>
          Create a Task!
        </button>
        <button className="mt-5 text-red-700" onClick={handleLogout}>
          Signout!
        </button>
      </div>
    </>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";

import TaskCreation from "../components/TaskCreation";
import TaskList from "../components/TaskList";
import HeaderComponent from "../components/HeaderComponent";

const Dashboard = () => {
  const [taskCreationModal, setTaskCreationModal] = useState(false);
  const [taskCreated, setTaskCreated] = useState(false);

  const openTaskModal = () => setTaskCreationModal(true);
  const closeTaskModal = () => {
    setTaskCreationModal(false);
    setTaskCreated(true);
  };

  useEffect(() => {
    if (taskCreated) {
      setTaskCreated(false);
    }
  }, [taskCreated]);

  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <HeaderComponent />
        <TaskCreation isOpen={taskCreationModal} closeModal={closeTaskModal} />
        <TaskList taskCreated={taskCreated} />
        <button className="mt-5" onClick={openTaskModal}>
          <p className="hover:font-bold">Create a Task!</p>
        </button>
      </div>
    </>
  );
};

export default Dashboard;

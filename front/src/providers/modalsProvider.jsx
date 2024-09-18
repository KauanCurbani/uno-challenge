import { createContext, useState } from "react";
import CreateTaskModal from "../presentation/modals/createTaskModal";
import EditTaskModal from "../presentation/modals/editTaskModal";
import TaskDetailModal from "../presentation/modals/taskDetailModal";

const ModalsContext = createContext({});

const ModalsType = {
  CREATE_TASK: "create-task",
  EDIT_TASK: "edit-task",
  TASK_DETAIL: "task-detail",
};

const ModalsProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);
  const [data, setData] = useState(null);

  function openModal(type, data) {
    setOpen(true);
    setType(type);
    setData(data);
  }

  function closeModal() {
    setOpen(false);
    setType(null);
    setData(null);
  }

  return (
    <ModalsContext.Provider
      value={{
        open,
        type,
        data,
        openModal,
        closeModal,
      }}
    >
      <CreateTaskModal />
      <EditTaskModal />
      <TaskDetailModal />
      {children}
    </ModalsContext.Provider>
  );
};

export { ModalsContext, ModalsProvider, ModalsType };

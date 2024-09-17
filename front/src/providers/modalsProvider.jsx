import { createContext, useState } from "react";
import CreateTaskModal from "../presentation/modals/createTaskModal";
import EditTaskModal from "../presentation/modals/editTaskModal";

const ModalsContext = createContext({});

const ModalsType = {
  CREATE_TASK: "create-task",
  EDIT_TASK: "edit-task",
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
      {children}
    </ModalsContext.Provider>
  );
};

export { ModalsContext, ModalsProvider, ModalsType };

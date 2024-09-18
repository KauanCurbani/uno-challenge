import { useMutation, useQuery } from "@apollo/client";
import { PlusIcon } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import {
  COMPLETE_TASK,
  CREATE_TASK,
  DELETE_TASK,
  LIST_TASKS,
  UPDATE_TASK,
} from "../../infra/graphql";
import { ModalsType } from "../../providers/modalsProvider";
import { cn } from "../../utils/cn";
import { Input } from "../components/input";
import { Progress } from "../components/progress";
import TaskDetail from "../components/taskDetail";
import TaskItem from "../components/taskItem";
import { useModals } from "../hooks/useModals";
import Logo from "../components/logo";

function MainPage() {
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  const { data, refetch } = useQuery(LIST_TASKS);
  const [addItem] = useMutation(CREATE_TASK);
  const [updateItem] = useMutation(UPDATE_TASK);
  const [toggleCompleteItem] = useMutation(COMPLETE_TASK);
  const [deleteItem] = useMutation(DELETE_TASK);
  const { openModal } = useModals();
  const selectedItem = data?.listTasks.find((item) => item.id === selectedItemId);
  const itemsLength = data?.listTasks.length;
  document.title = `(${itemsLength}) | UNO - Todo List`;

  const completedItems = data?.listTasks.filter((item) => item.completed);
  const percent = (completedItems?.length / data?.listTasks.length) * 100 || 0;

  function onSelectItem(item) {
    if (selectedItemId === item.id) setSelectedItemId(null);
    else setSelectedItemId(item.id);
    if (window.innerWidth < 768) {
      openModal(ModalsType.TASK_DETAIL, { item });
    }
  }

  async function getTodosWithFilter(filter) {
    refetch({ filter });
  }

  async function onAddItem() {
    openModal(ModalsType.CREATE_TASK, { addItem });
  }

  async function onDeleteItem(item) {
    try {
      await deleteItem({
        variables: {
          taskId: item.id,
        },
        awaitRefetchQueries: true,
        refetchQueries: [LIST_TASKS],
      });
    } catch (e) {
      toast.error(e.message);
    }
  }

  async function completeItem(item) {
    try {
      await toggleCompleteItem({
        variables: {
          taskId: item.id,
        },
        awaitRefetchQueries: true,
        refetchQueries: [LIST_TASKS],
      });
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="flex w-full">
      <div
        className={cn(
          "w-0 transition-all duration-700 ease-in-out hidden md:flex",
          selectedItem && "w-1/3"
        )}
      />
      <div
        className={cn(
          "absolute bg-background prose p-4 max-h-screen overflow-y-auto z-10 h-screen border-r w-1/2 transition-all duration-700 ease-in-out hidden md:flex flex-col -translate-x-full",
          selectedItem && "translate-x-0"
        )}
        data-color-mode="light"
      >
        {selectedItem && <TaskDetail task={selectedItem} close={() => setSelectedItemId(null)} />}
      </div>
      <div className="p-4 max-w-xl w-full max-h-screen overflow-y-auto mx-auto no-scrollbar">
        <div className="flex flex-col mb-2">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-black/50 font-medium uppercase text-xs">Minhas</span>
              <span className="text-black font-medium uppercase text-3xl leading-none">
                Tarefas
              </span>
            </div>
            <Logo className={"w-12"}/>
          </div>
        </div>
        <Input
          placeholder="Buscar..."
          className="mb-2"
          onChange={(e) => {
            getTodosWithFilter(e.target.value);
          }}
        />
        <div className=" mb-2">
          <div className="flex mb-1 items-center justify-between text-xs text-muted-foreground">
            <span>Finalizado</span>
            <span>{percent.toFixed(0)}%</span>
          </div>
          <Progress value={percent} />
        </div>
        {data?.listTasks.map((item) => (
          <TaskItem
            item={item}
            isSelected={selectedItemId === item.id}
            key={item.id}
            completeItem={completeItem}
            selectItem={onSelectItem}
            deleteItem={onDeleteItem}
            updateItem={updateItem}
          />
        ))}
        <div
          onClick={onAddItem}
          className="p-2 hover:bg-muted transition-all rounded-md cursor-pointer flex justify-center items-center"
        >
          <PlusIcon />
        </div>
      </div>
    </div>
  );
}

export default MainPage;

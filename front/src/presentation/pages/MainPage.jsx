import { useMutation, useQuery } from "@apollo/client";
import { getOperationName } from "@apollo/client/utilities";
import { CheckCircle, Circle, EditIcon, PlusIcon, Trash2 } from "lucide-react";
import React from "react";
import {
  ADD_ITEM_MUTATION,
  DELETE_ITEM_MUTATION,
  GET_TODO_LIST,
  UPDATE_ITEM_MUTATION,
} from "../../infra/graphql";
import { ModalsType } from "../../providers/modalsProvider";
import { cn } from "../../utils/cn";
import { CommandMenu } from "../components/commandMenu";
import { Input } from "../components/input";
import { Progress } from "../components/progress";
import TaskDetail from "../components/taskDetail";
import { useModals } from "../hooks/useModals";

function MainPage() {
  const { data, refetch } = useQuery(GET_TODO_LIST);
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  const [addItem] = useMutation(ADD_ITEM_MUTATION);
  const [updateItem] = useMutation(UPDATE_ITEM_MUTATION);
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION);
  const { openModal } = useModals();
  const selectedItem = data?.todoList.find((item) => item.id === selectedItemId);
  const itemsLength = data?.todoList.length;
  document.title = `UNO | (${itemsLength}) Todo List`;


  const completedItems = data?.todoList.filter((item) => item.completed);
  const percent = (completedItems?.length / data?.todoList.length) * 100 || 0;

  function onSelectItem(item) {
    if (selectedItemId === item.id) setSelectedItemId(null);
    else setSelectedItemId(item.id);
  }

  async function getTodosWithFilter(filter) {
    refetch({ filter: { name: filter } });
  }

  async function onAddItem() {
    openModal(ModalsType.CREATE_TASK, { addItem });
  }

  async function onDeleteItem(item) {
    await deleteItem({
      variables: {
        id: item.id,
      },
      awaitRefetchQueries: true,
      refetchQueries: [getOperationName(GET_TODO_LIST)],
    });
  }

  async function completeItem(item) {
    await updateItem({
      variables: {
        values: {
          id: item.id,
          name: item.name,
          description: item.description,
          completed: !item.completed,
        },
      },
      awaitRefetchQueries: true,
      refetchQueries: [getOperationName(GET_TODO_LIST)],
    });
  }

  return (
    <>
      <CommandMenu />
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
        <div className="p-4 max-w-xl w-full mx-auto">
          <div className="flex flex-col mb-2">
            <span className="text-black/50 font-medium uppercase text-xs">Minhas</span>
            <span className="text-black font-medium uppercase text-3xl leading-none">Tarefas</span>
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
          {data?.todoList.map((item) => (
            <div
              key={item.id}
              className={cn(
                "p-2 hover:bg-muted/50 group transition-all rounded-md cursor-pointer flex gap-2 items-center",
                selectedItem?.id === item.id && "ring",
                item.completed && "text-muted-foreground opacity-50 line-through"
              )}
              onClick={() => onSelectItem(item)}
            >
              <div className="flex flex-col">
                <span className="font-medium">{item.name}</span>
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  completeItem(item);
                }}
                className="ml-auto flex gap-2"
              >
                <div
                  className="opacity-0 group-hover:opacity-100 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(ModalsType.EDIT_TASK, {
                      updateItem,
                      item,
                    });
                  }}
                >
                  <EditIcon className="h-5 w-5" />
                </div>
                <div
                  className="opacity-0 group-hover:opacity-100 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteItem(item);
                  }}
                >
                  <Trash2 className="h-5 w-5" />
                </div>
                <div>
                  {item.completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div
            onClick={onAddItem}
            className="p-2 hover:bg-muted transition-all rounded-md cursor-pointer flex justify-center items-center"
          >
            <PlusIcon />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;

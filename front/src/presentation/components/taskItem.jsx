import { cn } from "../../utils/cn";
import { useModals } from "../hooks/useModals";
import { ModalsType } from "../../providers/modalsProvider";
import { CheckCircle, Circle, EditIcon, Trash2 } from "lucide-react";

function TaskItem({ item, isSelected, selectItem, completeItem, updateItem, deleteItem }) {
  const { openModal } = useModals();
  return (
    <div
      key={item.id}
      className={cn(
        "p-2 hover:bg-muted/50 group transition-all rounded-md cursor-pointer flex gap-2 items-center",
        isSelected && "ring",
        item.completed && "text-muted-foreground opacity-50 line-through"
      )}
      onClick={() => selectItem(item)}
    >
      <div className="flex flex-col">
        <span className="font-medium">{item.title}</span>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          completeItem(item);
        }}
        className="ml-auto flex gap-2"
      >
        <div
          className="md:opacity-0 group-hover:opacity-100 transition-all"
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
          className="md:opacity-0 group-hover:opacity-100 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            deleteItem(item);
          }}
        >
          <Trash2 className="h-5 w-5" />
        </div>
        <div>
          {item.completed ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;

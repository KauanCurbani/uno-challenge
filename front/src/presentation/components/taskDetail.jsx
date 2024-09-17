import MDEditor from "@uiw/react-md-editor";
import {
    CheckCircle2Icon,
    CircleIcon,
    EditIcon,
    PlusIcon,
    XCircle,
    XIcon
} from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "./button";

function TaskDetail({ close, task }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold"> {task.name} </span>
        <Button size="icon" variant="ghost" onClick={close}>
          <XIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="w-full h-0.5 bg-muted my-2" />
      <span className="text-xs uppercase font-medium text-muted-foreground">Descrição</span>
      <div className="border rounded-md p-2 list-disc">
        <MDEditor.Markdown source={task.description} />
      </div>
      <div className="mt-4">
        <span className="text-xs uppercase font-medium text-muted-foreground">Histórico</span>

        {task.history.map((history, idx) => {
          let icon;
          let color;
          let background;
          let label;

          switch (history.type) {
            case "CREATED":
              icon = <PlusIcon className="h-4 w-4" />;
              color = "text-blue-500";
              background = "bg-blue-100";
              label = "Criado";
              break;
            case "UPDATED":
              icon = <EditIcon className="h-4 w-4" />;
              color = "text-yellow-500";
              background = "bg-yellow-100";
              label = "Atualizado";
              break;

            case "COMPLETED":
              icon = <CheckCircle2Icon className="h-4 w-4" />;
              color = "text-green-500";
              background = "bg-green-100";
              label = "Completado";
              break;
            case "UNCOMPLETED":
              icon = <XCircle className="h-4 w-4" />;
              color = "text-red-500";
              background = "bg-red-100";
              label = "Desmarcado";
              break;
            default:
              icon = <CircleIcon className="h-4 w-4" />;
              color = "text-gray-500";
              background = "bg-gray-100";
              label = "Desconhecido";
              break;
          }

          return (
            <>
              <div key={history.id} className="flex items-center gap-2">
                <div
                  className={cn(
                    "aspect-square w-8 flex items-center justify-center rounded-full ",
                    color,
                    background
                  )}
                >
                  {icon}
                </div>
                <span className="text-muted-foreground">
                  {label},&nbsp;
                  <span className="text-muted-foreground text-xs">
                    {new Date(history.date).toLocaleString()},
                  </span>
                </span>
              </div>
              {idx !== task.history.length - 1 && <div className="w-0.5 h-6 bg-muted ml-3.5" />}
            </>
          );
        })}
      </div>
    </>
  );
}

export default TaskDetail;

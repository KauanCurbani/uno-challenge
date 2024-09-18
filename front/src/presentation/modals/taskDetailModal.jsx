import { ModalsType } from "../../providers/modalsProvider";
import { Dialog, DialogContent } from "../components/dialog";
import TaskDetail from "../components/taskDetail";
import { useModals } from "../hooks/useModals";

function TaskDetailModal() {
  const { open, type, data, closeModal } = useModals();
  const isOpen = open && type === ModalsType.TASK_DETAIL;
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className={"p-0"} showClose={false}>
        <div className="max-h-[50vh] overflow-y-auto p-4" data-color-mode="light">
          {isOpen && <TaskDetail task={data.item} close={closeModal} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailModal;

import { getOperationName } from "@apollo/client/utilities";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { GET_TODO_LIST } from "../../infra/graphql";
import { ModalsType } from "../../providers/modalsProvider";
import { Button } from "../components/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../components/dialog";
import { Input } from "../components/input";
import { useModals } from "../hooks/useModals";

function EditTaskModal() {
  const { open, type, data, closeModal } = useModals();
  const isOpen = open && type === ModalsType.EDIT_TASK;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (data && isOpen) {
      setName(data.item.name);
      setDescription(data.item.description);
    }
  }, [isOpen, data]);

  async function onConfirm() {
    data.updateItem({
      variables: {
        values: {
          id: data.item.id,
          completed: data.item.completed,
          name,
          description,
        },
      },
      awaitRefetchQueries: true,
      refetchQueries: [getOperationName(GET_TODO_LIST)],
    });
    closeModal();
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogTitle>Editar tarefa</DialogTitle>
        <div className="space-y-4 list-disc">
          <Input
            placeholder="Nome da tarefa"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <MDEditor
            value={description}
            onChange={setDescription}
            hideToolbar
            data-color-mode="light"
          />
        </div>
        <DialogFooter>
          <Button
            variant={"ghost"}
            onClick={() => {
              setName("");
              setDescription("");
              closeModal();
            }}
          >
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditTaskModal;

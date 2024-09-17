import { getOperationName } from "@apollo/client/utilities";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { GET_TODO_LIST } from "../../infra/graphql";
import { ModalsType } from "../../providers/modalsProvider";
import { Button } from "../components/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../components/dialog";
import { Input } from "../components/input";
import { useModals } from "../hooks/useModals";

function CreateTaskModal() {
  const { open, type, data, closeModal } = useModals();
  const isOpen = open && type === ModalsType.CREATE_TASK;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function onConfirm() {
    data.addItem({
      variables: {
        values: {
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
        <DialogTitle>Criar tarefa</DialogTitle>
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

export default CreateTaskModal;

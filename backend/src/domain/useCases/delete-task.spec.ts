import { Task } from "../entities";
import { DeleteTaskRepository } from "../repositories/delete-task-repository";
import { DeleteTask } from "./delete-task";


class DeleteTaskRepositorySpy implements DeleteTaskRepository {
  count = 0;
  throws = false;
  task: Task;
  async call(id: string): Promise<Task> {
    if (this.throws) throw new Error("any_error");
    this.task = {
      id,
      title: "any_title",
      description: "any_description",
      completed: false,
    };
    this.count++;
    return this.task;
  }
}

describe("DeleteTask", () => {
  let deleteTask: DeleteTask;
  let deleteTaskRepositorySpy: DeleteTaskRepositorySpy;

  beforeEach(() => {
    deleteTaskRepositorySpy = new DeleteTaskRepositorySpy();
    deleteTask = new DeleteTask(deleteTaskRepositorySpy);
  });

  it("should return a task", async () => {
    const response = await deleteTask.call("any_id");
    expect(response).toEqual({
      id: "any_id",
      title: "any_title",
      description: "any_description",
      completed: false,
    });
  });

  it("should call repository once", async () => {
    await deleteTask.call("any_id");
    expect(deleteTaskRepositorySpy.count).toBe(1);
  });

  it("should throw an error if repository throws", async () => {
    deleteTaskRepositorySpy.throws = true;
    try {
      await deleteTask.call("any_id");
    } catch (error: any) {
      expect(error.message).toBe("any_error");
    }
  });
});

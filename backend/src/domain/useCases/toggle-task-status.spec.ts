import { Task } from "../entities";
import { GetTaskByIdRepository } from "../repositories/get-task-by-id-repository";
import { UpdateTaskRepository } from "../repositories/update-task-repository";
import { ToggleTaskStatus } from "./toggle-task-status";

class GetTaskByIdRepositorySpy implements GetTaskByIdRepository {
  task: Task = {
    id: "any_id",
    title: "any_title",
    description: "any_description",
    completed: false,
  };
  count = 0;
  throws = false;

  async call(taskId: string): Promise<Task> {
    if (this.throws) throw new Error("Error");
    this.count++;
    return this.task;
  }
}

class UpdateTaskRepositorySpy implements UpdateTaskRepository {
  count = 0;
  throws = false;

  async call(task: Task): Promise<Task> {
    if (this.throws) throw new Error("Error");
    this.count++;
    return task;
  }
}

describe("ToggleTaskStatus", () => {
  let toggleTaskStatus: ToggleTaskStatus;
  let getTaskByIdRepositorySpy: GetTaskByIdRepositorySpy;
  let updateTaskRepositorySpy: UpdateTaskRepositorySpy;

  beforeEach(() => {
    getTaskByIdRepositorySpy = new GetTaskByIdRepositorySpy();
    updateTaskRepositorySpy = new UpdateTaskRepositorySpy();
    toggleTaskStatus = new ToggleTaskStatus(getTaskByIdRepositorySpy, updateTaskRepositorySpy);
  });

  it("should call getTaskByIdRepository with correct params", async () => {
    const spy = jest.spyOn(getTaskByIdRepositorySpy, "call");
    await toggleTaskStatus.call("any_id");
    expect(spy).toHaveBeenCalledWith("any_id");
  });

  it("should call updateTaskRepository with correct params", async () => {
    const spy = jest.spyOn(updateTaskRepositorySpy, "call");
    await toggleTaskStatus.call("any_id");
    expect(spy).toHaveBeenCalledWith({
      id: "any_id",
      title: "any_title",
      description: "any_description",
      completed: true,
    });
  });

  it("should return a task", async () => {
    const response = await toggleTaskStatus.call("any_id");
    expect(response).toEqual({
      id: "any_id",
      title: "any_title",
      description: "any_description",
      completed: true,
    });
  });

  it("should throw an error if getTaskByIdRepository throws", async () => {
    getTaskByIdRepositorySpy.throws = true;
    try {
      await toggleTaskStatus.call("any_id");
    } catch (error: any) {
      expect(error.message).toBe("Error");
    }
  });

  it("should throw an error if updateTaskRepository throws", async () => {
    updateTaskRepositorySpy.throws = true;
    try {
      await toggleTaskStatus.call("any_id");
    } catch (error: any) {
      expect(error.message).toBe("Error");
    }
  });

  it("should call getTaskByIdRepository once", async () => {
    await toggleTaskStatus.call("any_id");
    expect(getTaskByIdRepositorySpy.count).toBe(1);
  });

  it("should call updateTaskRepository once", async () => {
    await toggleTaskStatus.call("any_id");
    expect(updateTaskRepositorySpy.count).toBe(1);
  });
});

import { DeleteTaskRepository } from "@/domain/repositories/delete-task-repository";
import { Task } from "@/domain/entities";
import { FakeDeleteTaskRepository } from "./fake-delete-task-repository";

describe("FakeDeleteTaskRepository", () => {
  let fakeDeleteTaskRepository: FakeDeleteTaskRepository;
  let TASKS_SOURCE: Task[];

  beforeEach(() => {
    TASKS_SOURCE = [];
    fakeDeleteTaskRepository = new FakeDeleteTaskRepository(TASKS_SOURCE);
  });

  it("should delete a task", async () => {
    const task: Task = {
      id: "1",
      title: "any_title",
      description: "any_description",
      completed: false,
    };

    TASKS_SOURCE.push(task);
    expect(TASKS_SOURCE.length).toBe(1);

    await fakeDeleteTaskRepository.call(task.id);

    expect(TASKS_SOURCE.length).toBe(0);
  });

  it("should throw an error if task not found", async () => {
    await expect(fakeDeleteTaskRepository.call("1")).rejects.toThrow(new Error("Task not found"));
  });
});

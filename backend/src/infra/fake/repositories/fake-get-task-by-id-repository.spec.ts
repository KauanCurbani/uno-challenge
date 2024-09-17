import { Task } from "@/domain/entities";
import { FakeGetTaskByIdRepository } from "./fake-get-task-by-id-repository";

describe("FakeGetTaskByIdRepository", () => {
  let fakeGetTaskByIdRepository: FakeGetTaskByIdRepository;
  let tasks: Task[];

  beforeEach(() => {
    tasks = [];
    fakeGetTaskByIdRepository = new FakeGetTaskByIdRepository(tasks);
  });

  it("should return a task", async () => {
    const task: Task = {
      id: "1",
      title: "title",
      description: "description",
      completed: false,
    };
    tasks.push(task);

    const response = await fakeGetTaskByIdRepository.call("1");

    expect(response).toEqual(task);
  });

  it("should throw an error if the task is not found", async () => {
    await expect(fakeGetTaskByIdRepository.call("1")).rejects.toThrowError("Task not found");
  });
});

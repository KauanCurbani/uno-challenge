import { Task } from "@/domain/entities/task";
import { GetAllTasksRepository } from "@/domain/repositories/get-all-tasks-repository";
import { FakeGetAllTasksRepository } from "./fake-get-all-tasks-repository";

describe("FakeGetAllTasksRepository", () => {
  let fakeGetAllTasksRepository: FakeGetAllTasksRepository;
  let tasks: Task[];

  beforeEach(() => {
    tasks = [];
    fakeGetAllTasksRepository = new FakeGetAllTasksRepository(tasks);
  });

  it("should return all tasks", async () => {
    const result = await fakeGetAllTasksRepository.call("");
    expect(result).toEqual(tasks);
  });

  it("should return all tasks with filter", async () => {
    tasks = [
      { id: "1", title: "any_title", description: "any_description", completed: false },
      { id: "2", title: "test", description: "any_description", completed: false },
    ];
    fakeGetAllTasksRepository = new FakeGetAllTasksRepository(tasks);

    const result = await fakeGetAllTasksRepository.call("any_title");
    expect(result).toEqual([tasks[0]]);
  });

  it("should return all tasks with filter case insensitive", async () => {
    tasks = [
      { id: "1", title: "any_title", description: "any_description", completed: false },
      { id: "2", title: "any_title", description: "any_description", completed: false },
    ];
    fakeGetAllTasksRepository = new FakeGetAllTasksRepository(tasks);

    const result = await fakeGetAllTasksRepository.call("ANY_TITLE");
    expect(result).toEqual(tasks);
  });
});

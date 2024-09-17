import { History } from "@/domain/entities";
import { Task } from "@/domain/entities/task";
import { FakeUpdateTaskRepository } from "./fake-update-task-repository";



describe("FakeUpdateTaskRepository", () => {
  let fakeUpdateTaskRepository: FakeUpdateTaskRepository;
  let tasks: Task[];
  let history: History[];

  beforeEach(() => {
    tasks = [];
    history = [];
    fakeUpdateTaskRepository = new FakeUpdateTaskRepository(tasks, history);
  });

  it("should throw an error if the task is not found", async () => {
    await expect(
      fakeUpdateTaskRepository.call({
        id: "1",
        title: "any_title",
        description: "any_description",
        completed: false,
      })
    ).rejects.toThrow("Task not found");
  });

  it("should throw an error if the task already exists", async () => {
    tasks = [
      { id: "1", title: "any_title", description: "any_description", completed: false },
      { id: "2", title: "test", description: "any_description", completed: false },
    ];
    fakeUpdateTaskRepository = new FakeUpdateTaskRepository(tasks, history);

    await expect(
      fakeUpdateTaskRepository.call({
        id: "1",
        title: "test",
        description: "any_description",
        completed: false,
      })
    ).rejects.toThrowError("Task already exists");
  });

  it("should update a task", async () => {
    tasks = [{ id: "1", title: "any_title", description: "any_description", completed: false }];
    fakeUpdateTaskRepository = new FakeUpdateTaskRepository(tasks, history);

    const result = await fakeUpdateTaskRepository.call({
      id: "1",
      title: "test",
      description: "any_description",
      completed: false,
    });

    expect(result).toEqual({
      id: "1",
      title: "test",
      description: "any_description",
      completed: false,
    });
  });

  it("should add a history", async () => {
    tasks = [{ id: "1", title: "any_title", description: "any_description", completed: false }];
    fakeUpdateTaskRepository = new FakeUpdateTaskRepository(tasks, history);

    await fakeUpdateTaskRepository.call({
      id: "1",
      title: "test",
      description: "any_description",
      completed: false,
    });

    expect(history.length).toBe(1);
    expect(history[0].type).toBe("UPDATED");
  });

  it("should update a task with a new description", async () => {
    tasks = [{ id: "1", title: "any_title", description: "any_description", completed: false }];
    fakeUpdateTaskRepository = new FakeUpdateTaskRepository(tasks, history);

    const result = await fakeUpdateTaskRepository.call({
      id: "1",
      title: "any_title",
      description: "new_description",
      completed: false,
    });

    expect(result).toEqual({
      id: "1",
      title: "any_title",
      description: "new_description",
      completed: false,
    });
  });

  it("should add a history when the task is completed", async () => {
    tasks = [{ id: "1", title: "any_title", description: "any_description", completed: false }];
    fakeUpdateTaskRepository = new FakeUpdateTaskRepository(tasks, history);

    await fakeUpdateTaskRepository.call({
      id: "1",
      title: "any_title",
      description: "any_description",
      completed: true,
    });

    expect(history.length).toBe(1);
    expect(history[0].type).toBe("COMPLETED");
  });

  it("should update a task to completed", async () => {
    tasks = [{ id: "1", title: "any_title", description: "any_description", completed: false }];
    fakeUpdateTaskRepository = new FakeUpdateTaskRepository(tasks, history);

    const result = await fakeUpdateTaskRepository.call({
      id: "1",
      title: "any_title",
      description: "any_description",
      completed: true,
    });

    expect(result).toEqual({
      id: "1",
      title: "any_title",
      description: "any_description",
      completed: true,
    });
  });

  it("should update a task to uncompleted", async () => {
    tasks = [{ id: "1", title: "any_title", description: "any_description", completed: true }];
    fakeUpdateTaskRepository = new FakeUpdateTaskRepository(tasks, history);

    const result = await fakeUpdateTaskRepository.call({
      id: "1",
      title: "any_title",
      description: "any_description",
      completed: false,
    });

    expect(result).toEqual({
      id: "1",
      title: "any_title",
      description: "any_description",
      completed: false,
    });
  });

  it("should add a history when the task is uncompleted", async () => {
    tasks = [{ id: "1", title: "any_title", description: "any_description", completed: true }];
    fakeUpdateTaskRepository = new FakeUpdateTaskRepository(tasks, history);

    await fakeUpdateTaskRepository.call({
      id: "1",
      title: "any_title",
      description: "any_description",
      completed: false,
    });

    expect(history.length).toBe(1);
    expect(history[0].type).toBe("UNCOMPLETED");
  });

  it("should update a task with a new title", async () => {
    tasks = [{ id: "1", title: "any_title", description: "any_description", completed: false }];
    fakeUpdateTaskRepository = new FakeUpdateTaskRepository(tasks, history);

    const result = await fakeUpdateTaskRepository.call({
      id: "1",
      title: "test",
      description: "any_description",
      completed: false,
    });

    expect(result).toEqual({
      id: "1",
      title: "test",
      description: "any_description",
      completed: false,
    });
  });
});

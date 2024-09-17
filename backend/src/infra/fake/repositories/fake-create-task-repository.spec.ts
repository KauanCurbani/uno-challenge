import "reflect-metadata";

import { History, Task } from "@/domain/entities";
import { randomUUID } from "crypto";
import { FakeCreateTaskRepository } from "./fake-create-task-repository";

describe("FakeCreateTaskRepository", () => {
  let fakeCreateTaskRepository: FakeCreateTaskRepository;
  let tasks: Task[] = [];
  let history: History[] = [];

  beforeEach(() => {
    tasks = [];
    history = [];
    fakeCreateTaskRepository = new FakeCreateTaskRepository(tasks, history);
  });

  it("should create a task", async () => {
    const response = await fakeCreateTaskRepository.call({
      description: "any_description",
      title: "any_title",
    });

    expect(response.title).toBe("any_title");
    expect(response.description).toBe("any_description");
    expect(response.completed).toBe(false);
  });

  it("should throw an error if title is empty", async () => {
    try {
      await fakeCreateTaskRepository.call({
        description: "any_description",
        title: "",
      });
    } catch (error: any) {
      expect(error.message).toBe("Task already exists");
    }
  });

  it("should call repository once", async () => {
    await fakeCreateTaskRepository.call({
      description: "any_description",
      title: "any_title",
    });
    expect(tasks.length).toBe(1);
  });

  it("should throw an error if task already exists", async () => {
    tasks.push({
      id: randomUUID(),
      title: "any_title",
      description: "any_description",
      completed: false,
    });

    try {
      await fakeCreateTaskRepository.call({
        description: "any_description",
        title: "any_title",
      });
    } catch (error: any) {
      expect(error.message).toBe("Task already exists");
    }
  });

  it("should add a task to history", async () => {
    await fakeCreateTaskRepository.call({
      description: "any_description",
      title: "any_title",
    });

    expect(history.length).toBe(1);
  });
});

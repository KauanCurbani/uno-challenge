import "reflect-metadata";
import { Task } from "../entities";
import assert from "node:assert";
import { CreateTask, CreateTaskInput } from "./create-task";

class CreateTaskRepository {
  calls = 0;
  throws = false;

  async call(task: Task): Promise<Task> {
    if (this.throws) throw new Error("Error");
    this.calls++;
    return task;
  }
}

describe("Create Task", () => {
  let createTask: CreateTask;
  let createTaskRepository: CreateTaskRepository;

  beforeEach(() => {
    createTaskRepository = new CreateTaskRepository();
    createTask = new CreateTask(createTaskRepository);
  });
  it("should create a task", async () => {
    const response = await createTask.call({ description: "any_description", title: "any_title" });
    assert.deepEqual(response.title, "any_title");
    assert.deepEqual(response.description, "any_description");
    assert.deepEqual(response.completed, false);
  });

  it("should throw an error if title is empty", async () => {
    try {
      await createTask.call({ description: "any_description", title: "" });
    } catch (error: any) {
      assert.deepEqual(error.message, "Error: Title is required");
    }
  });

  it("should throw an error if repository throws", async () => {
    createTaskRepository.throws = true;
    try {
      await createTask.call({ description: "any_description", title: "any_title" });
    } catch (error: any) {
      assert.deepEqual(error.message, "Error: Error");
    }
  });

  it("should call repository once", async () => {
    await createTask.call({ description: "any_description", title: "any_title" });
    assert.deepEqual(createTaskRepository.calls, 1);
  });
});

import "reflect-metadata";

import { Task } from "../entities";
import { UpdateTaskRepository } from "../repositories/update-task-repository";
import { UpdateTask, UpdateTaskInput } from "./update-task";



class UpdateTaskRepositorySpy implements UpdateTaskRepository {
  task: Task;
  count = 0;
  throws = false;
  async call(data: UpdateTaskInput): Promise<Task> {
    if (this.throws) throw new Error("Error");
    this.count++;

    this.task = {
      id: data.id,
      title: data.title,
      description: data.description,
      completed: data.completed,
    };
    return this.task;
  }
}

describe("UpdateTask", () => {
  let updateTask: UpdateTask;
  let updateTaskRepositorySpy: UpdateTaskRepositorySpy;

  beforeEach(() => {
    updateTaskRepositorySpy = new UpdateTaskRepositorySpy();
    updateTask = new UpdateTask(updateTaskRepositorySpy);
  });

  it("should call repository with correct params", async () => {
    const spy = jest.spyOn(updateTaskRepositorySpy, "call");
    await updateTask.call({
      id: "any_id",
      title: "any_title",
      description: "any_description",
      completed: false,
    });
    expect(spy).toHaveBeenCalledWith({
      id: "any_id",
      title: "any_title",
      description: "any_description",
      completed: false,
    });
  });

  it("should return a task", async () => {
    const response = await updateTask.call({
      id: "any_id",
      title: "any_title",
      description: "any_description",
      completed: false,
    });
    expect(response).toEqual({
      id: "any_id",
      title: "any_title",
      description: "any_description",
      completed: false,
    });
  });

  it("should throw an error if title is empty", async () => {
    try {
      await updateTask.call({
        id: "any_id",
        title: "",
        description: "any_description",
        completed: false,
      });
    } catch (error: any) {
      expect(error.message).toBe("Title is required");
    }
  });

  it("should throw an error if repository throws", async () => {
    updateTaskRepositorySpy.throws = true;
    try {
      await updateTask.call({
        id: "any_id",
        title: "any_title",
        description: "any_description",
        completed: false,
      });
    } catch (error: any) {
      expect(error.message).toBe("Error");
    }
  });

  it("should call repository once", async () => {
    await updateTask.call({
      id: "any_id",
      title: "any_title",
      description: "any_description",
      completed: false,
    });
    expect(updateTaskRepositorySpy.count).toBe(1);
  });


});

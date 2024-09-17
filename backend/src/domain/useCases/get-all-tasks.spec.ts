import { Task } from "../entities";
import { GetAllTasksRepository } from "../repositories/get-all-tasks-repository";
import { GetAllTasks } from "./get-all-tasks";

class FakeGetAllTasksRepositorySpy implements GetAllTasksRepository {
  response: Task[] = [];
  count = 0;
  throws = false;
  async call(filter: string) {
    if (this.throws) throw new Error("Error");
    this.count++;
    return this.response;
  }
}

describe("GetAllTasks", () => {
  let getAllTasks: GetAllTasks;
  let fakeGetAllTasksRepositorySpy: FakeGetAllTasksRepositorySpy;

  beforeEach(() => {
    fakeGetAllTasksRepositorySpy = new FakeGetAllTasksRepositorySpy();
    getAllTasks = new GetAllTasks(fakeGetAllTasksRepositorySpy);
  });

  it("should call repository with correct params", async () => {
    const spy = jest.spyOn(fakeGetAllTasksRepositorySpy, "call");
    await getAllTasks.call("all");
    expect(spy).toHaveBeenCalledWith("all");
  });

  it("should return empty array if no tasks are found", async () => {
    const result = await getAllTasks.call("all");
    expect(result).toEqual([]);
  });

  it("should return an array of tasks", async () => {
    fakeGetAllTasksRepositorySpy.response = [
      {
        id: "any_id",
        title: "any_title",
        description: "any_description",
        completed: false,
      },
    ];
    const result = await getAllTasks.call("all");
    expect(result).toEqual([
      {
        id: "any_id",
        title: "any_title",
        description: "any_description",
        completed: false,
      },
    ]);
  });

  it("should call repository once", async () => {
    await getAllTasks.call("all");
    expect(fakeGetAllTasksRepositorySpy.count).toBe(1);
  });

  it("should throw an error if repository throws", async () => {
    fakeGetAllTasksRepositorySpy.throws = true;
    try {
      await getAllTasks.call("all");
    } catch (error: any) {
      expect(error.message).toBe("Error");
    }
  });
});

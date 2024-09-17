import { Task } from "@/domain/entities";
import { GetTaskByIdRepository } from "@/domain/repositories/get-task-by-id-repository";


export class FakeGetTaskByIdRepository implements GetTaskByIdRepository {
  constructor(private TASKS_SOURCE: Task[]) {}

  async call(taskId: string): Promise<Task> {
    const task = this.TASKS_SOURCE.find((task) => task.id === taskId);
    if (!task) throw new Error("Task not found");
    return task;
  }
}

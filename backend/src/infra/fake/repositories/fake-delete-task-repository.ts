import { DeleteTaskRepository } from "@/domain/repositories/delete-task-repository";
import { Task } from "@/domain/entities";

export class FakeDeleteTaskRepository implements DeleteTaskRepository {
  constructor(private TASKS_SOURCE: Task[]) {}

  async call(taskId: string): Promise<Task> {
    const task = this.TASKS_SOURCE.find((task) => task.id === taskId);
    if (!task) throw new Error("Task not found");

    this.TASKS_SOURCE.splice(
      this.TASKS_SOURCE.findIndex((task) => task.id === taskId),
      1
    );
    return task;
  }
}

import { Task } from "@/domain/entities/task";
import { GetAllTasksRepository } from "@/domain/repositories/get-all-tasks-repository";

export class FakeGetAllTasksRepository implements GetAllTasksRepository {
  constructor(private TASKS_SOURCE: Task[]) {}

  async call(filter: string): Promise<Task[]> {
    if (filter) {
      return this.TASKS_SOURCE.filter((task) =>
        task.title.toLocaleLowerCase().includes(filter.toLowerCase())
      );
    }

    return this.TASKS_SOURCE;
  }
}

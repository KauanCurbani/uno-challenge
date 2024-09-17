import { Task } from "../entities";
import { DeleteTaskRepository } from "../repositories/delete-task-repository";

export class DeleteTask {
  constructor(private readonly deleteTaskRepository: DeleteTaskRepository) {}

  async call(id: string): Promise<Task> {
    return await this.deleteTaskRepository.call(id);
  }
}

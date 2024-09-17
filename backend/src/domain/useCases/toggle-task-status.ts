import { Task } from "../entities";
import { GetTaskByIdRepository } from "../repositories/get-task-by-id-repository";
import { UpdateTaskRepository } from "../repositories/update-task-repository";

export class ToggleTaskStatus {
  constructor(
    private readonly getTaskByIdRepository: GetTaskByIdRepository,
    private readonly updateTaskRepository: UpdateTaskRepository
  ) {}

  async call(taskId: string): Promise<Task> {
    const task = await this.getTaskByIdRepository.call(taskId);
    task.completed = !task.completed;
    await this.updateTaskRepository.call(task);
    return task;
  }
}

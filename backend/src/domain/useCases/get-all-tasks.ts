import { GetAllTasksRepository } from "../repositories/get-all-tasks-repository";

export class GetAllTasks {
  constructor(private readonly repo: GetAllTasksRepository) {}

  async call(filter: string) {
    return await this.repo.call(filter);
  }
}

import { Task } from "../entities";

export interface GetTaskByIdRepository {
  call(taskId: string): Promise<Task>;
}

import { Task } from "../entities";

export interface DeleteTaskRepository {
  call(taskId: string): Promise<Task>;
}

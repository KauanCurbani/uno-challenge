import { Task } from "../entities/task";
import { CreateTaskInput } from "../useCases/create-task";

export interface CreateTaskRepository {
  call(data: CreateTaskInput): Promise<Task>;
}

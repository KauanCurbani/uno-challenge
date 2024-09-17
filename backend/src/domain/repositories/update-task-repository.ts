import { Task } from "../entities/task";
import { UpdateTaskInput } from "../useCases/update-task";

export interface UpdateTaskRepository {
  call(data: UpdateTaskInput): Promise<Task>;
}

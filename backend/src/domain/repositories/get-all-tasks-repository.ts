import { Field, InputType } from "type-graphql";
import { Task } from "../entities/task";

export interface GetAllTasksRepository {
  call(filter: string): Promise<Task[]>;
}

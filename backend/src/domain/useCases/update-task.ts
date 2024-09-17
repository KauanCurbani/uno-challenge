import { Field, InputType } from "type-graphql";
import { Task } from "../entities/task";
import { UpdateTaskRepository } from "../repositories/update-task-repository";

@InputType()
export class UpdateTaskInput {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  completed: boolean;
}

export class UpdateTask {
  constructor(private readonly repo: UpdateTaskRepository) {}

  async call(data: UpdateTaskInput): Promise<Task> {
    if (!data.title || data.title === "") {
      throw new Error("Title is required");
    }

    return await this.repo.call(data);
  }
}

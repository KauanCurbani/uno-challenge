import { Field, InputType } from "type-graphql";
import { Task } from "../entities/task";
import { randomUUID } from "crypto";
import { CreateTaskRepository } from "../repositories/create-task-repository";

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;
  @Field()
  description: string;
}

export class CreateTask {
  constructor(private readonly repo: CreateTaskRepository) {}

  async call({ title, description }: CreateTaskInput): Promise<Task> {
    try {
      if (!title || title === "") {
        throw new Error("Title is required");
      }

      const uuid = randomUUID();
      const task = {
        id: uuid,
        title,
        completed: false,
        description,
      };
      return await this.repo.call(task);
    } catch (e: any) {
      throw new Error(e.toString());
    }
  }
}

import { CreateTaskRepository } from "@/domain/repositories/create-task-repository";
import { CreateTaskInput } from "@/domain/useCases/create-task";
import { randomUUID } from "crypto";
import { Task } from "@/domain/entities";

export class FakeCreateTaskRepository implements CreateTaskRepository {
  constructor(private TASKS_SOURCE: Task[], private HISTORY_SOURCE: any[]) {}

  async call(data: CreateTaskInput) {
    if (this.TASKS_SOURCE.find((task) => task.title === data.title)) {
      throw new Error("Task already exists");
    }

    const task = {
      id: randomUUID(),
      title: data.title,
      completed: false,
      description: data.description,
    };
    const history = {
      id: randomUUID(),
      taskId: task.id,
      type: "CREATED",
      date: new Date(),
    };

    this.TASKS_SOURCE.push(task);
    this.HISTORY_SOURCE.push(history);
    return task;
  }
}

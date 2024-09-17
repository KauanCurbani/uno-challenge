import { Task } from "@/domain/entities/task";
import { UpdateTaskRepository } from "@/domain/repositories/update-task-repository";
import { UpdateTaskInput } from "@/domain/useCases/update-task";

export class FakeUpdateTaskRepository implements UpdateTaskRepository {
  constructor(private TASKS_SOURCE: Task[], private HISTORY_SOURCE: any[]) {}
  async call(data: UpdateTaskInput): Promise<Task> {
    if (this.TASKS_SOURCE.find((task) => task.title === data.title && task.id !== data.id)) {
      throw new Error("Task already exists");
    }

    const currentIndex = this.TASKS_SOURCE.findIndex((task) => task.id === data.id);
    if (currentIndex === -1) {
      throw new Error("Task not found");
    }

    this.TASKS_SOURCE[currentIndex] = {
      ...this.TASKS_SOURCE[currentIndex],
      title: data.title,
      description: data.description,
    };
    this.HISTORY_SOURCE.push({
      id: data.id,
      type: "UPDATED",
      date: new Date(),
    });

    return this.TASKS_SOURCE[currentIndex];
  }
}

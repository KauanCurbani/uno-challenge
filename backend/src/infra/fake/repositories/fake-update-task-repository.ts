import { Task } from "@/domain/entities/task";
import { UpdateTaskRepository } from "@/domain/repositories/update-task-repository";
import { UpdateTaskInput } from "@/domain/useCases/update-task";
import { randomUUID } from "node:crypto";

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
    const oldTask = this.TASKS_SOURCE[currentIndex];
    const newTask = { ...oldTask, ...data };
    this.TASKS_SOURCE[currentIndex] = newTask;

    if (this.isCompleteChange(oldTask, newTask)) {
      this.HISTORY_SOURCE.push({
        id: randomUUID(),
        taskId: newTask.id,
        type: newTask.completed ? "COMPLETED" : "UNCOMPLETED",
        date: new Date().toISOString(),
      });
    } else {
      this.HISTORY_SOURCE.push({
        id: randomUUID(),
        taskId: newTask.id,
        type: "UPDATED",
        date: new Date().toISOString(),
      });
    }

    return newTask;
  }

  private isCompleteChange(oldTask: Task, newTask: Task): boolean {
    return oldTask.completed !== newTask.completed;
  }
}

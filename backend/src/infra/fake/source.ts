import { History } from "@/domain/entities/history";
import { Task } from "@/domain/entities/task";
import { randomFill, randomUUID } from "crypto";

export const TASKS_SOURCE: Task[] = [
  {
    id: randomUUID(),
    title: "Task 1",
    completed: false,
    description: "teste",
  },
];
export const HISTORY_SOURCE: History[] = [];

import { History, Task } from "@/domain/entities";
import {
  CreateTask,
  CreateTaskInput,
  DeleteTask,
  GetAllTasks,
  ToggleTaskStatus,
  UpdateTask,
  UpdateTaskInput,
} from "@/domain/useCases";
import {
  FakeCreateTaskRepository,
  FakeDeleteTaskRepository,
  FakeGetAllTasksRepository,
  FakeGetTaskByIdRepository,
  FakeUpdateTaskRepository,
} from "@/infra/fake/repositories";
import { HISTORY_SOURCE, TASKS_SOURCE } from "@/infra/fake/source";
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";

@Resolver(() => Task)
export class TaskResolver {
  @Query(() => [Task])
  async listTasks(
    @Arg("filter", { nullable: true, defaultValue: "" }) filter: string
  ): Promise<Task[]> {
    const response = await new GetAllTasks(new FakeGetAllTasksRepository(TASKS_SOURCE)).call(
      filter
    );
    return response;
  }

  @FieldResolver(() => [History])
  async history(@Root() task: Task): Promise<History[]> {
    return HISTORY_SOURCE.filter((history) => history.taskId === task.id).sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  @Mutation(() => Task)
  async createTask(@Arg("data") data: CreateTaskInput): Promise<Task> {
    return new CreateTask(new FakeCreateTaskRepository(TASKS_SOURCE, HISTORY_SOURCE)).call(data);
  }

  @Mutation(() => Task)
  async updateTask(@Arg("data") data: UpdateTaskInput): Promise<Task> {
    return new UpdateTask(new FakeUpdateTaskRepository(TASKS_SOURCE, HISTORY_SOURCE)).call(data);
  }

  @Mutation(() => Task)
  async deleteTask(@Arg("taskId") taskId: string): Promise<Task> {
    return await new DeleteTask(new FakeDeleteTaskRepository(TASKS_SOURCE)).call(taskId);
  }

  @Mutation(() => Task)
  async completeTask(@Arg("taskId") taskId: string): Promise<Task> {
    return await new ToggleTaskStatus(
      new FakeGetTaskByIdRepository(TASKS_SOURCE),
      new FakeUpdateTaskRepository(TASKS_SOURCE, HISTORY_SOURCE)
    ).call(taskId);
  }
}

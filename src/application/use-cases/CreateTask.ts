import { Task, TaskProps } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { TaskFactory } from "../factories/TaskFactory";

export class CreateTask {
  constructor(
    private taskRepository: TaskRepository,
    private userRepository: UserRepository
  ) {}

  async execute(taskProps: Omit<TaskProps, "status">): Promise<Task> {
    if (!taskProps.title || !taskProps.description) {
      throw new Error("Title and Description are required.");
    }

    const user = await this.userRepository.findByName(taskProps.assignedTo);
    if (!user) {
      throw new Error("User not found.");
    }

    const task = TaskFactory.createNewTask(
      taskProps.id,
      taskProps.title,
      taskProps.description,
      taskProps.assignedTo
    );

    await this.taskRepository.save(task);
    return task;
  }
}

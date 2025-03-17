import { Task, TaskProps } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { TaskStatus } from "../../domain/value-objects/TaskStatus";

export class CreateTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskProps: Omit<TaskProps, "id" | "status">): Promise<Task> {
    const task = new Task({
      id: Math.random().toString(36).substring(7),
      title: taskProps.title,
      description: taskProps.description,
      status: new TaskStatus("pending"),
      assignedTo: taskProps.assignedTo,
    });
    await this.taskRepository.save(task);
    return task;
  }
}

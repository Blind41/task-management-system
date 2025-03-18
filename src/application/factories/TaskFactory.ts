import { Task } from "../../domain/entities/Task";
import { TaskStatus } from "../../domain/value-objects/TaskStatus";

export class TaskFactory {
  static createNewTask(
    id: string,
    title: string,
    description: string,
    assignedTo: string
  ): Task {
    return new Task({
      id,
      title,
      description,
      status: new TaskStatus("pending"),
      assignedTo,
    });
  }
}

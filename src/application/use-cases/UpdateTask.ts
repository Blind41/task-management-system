import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { TaskStatus } from "../../domain/value-objects/TaskStatus";

export class UpdateTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    taskId: string,
    updates: { title?: string; description?: string; status?: TaskStatus }
  ): Promise<Task | null> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      return null;
    }

    if (updates.title) {
      task.updateTitle(updates.title);
    }
    if (updates.description) {
      task.updateDescription(updates.description);
    }
    if (updates.status) {
      task.updateStatus(updates.status);
    }

    await this.taskRepository.save(task);
    return task;
  }
}

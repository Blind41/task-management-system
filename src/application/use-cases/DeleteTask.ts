import { TaskRepository } from "../../domain/repositories/TaskRepository";

export class DeleteTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<boolean> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      return false;
    }

    await this.taskRepository.delete(taskId);
    return true;
  }
}

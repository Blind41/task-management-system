import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  async save(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.find((task) => task.id === id) || null;
  }

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findByStatus(status: string): Promise<Task[]> {
    return this.tasks.filter((task) => task.status.getValue() === status);
  }

  async findByUser(userId: string): Promise<Task[]> {
    return this.tasks.filter((task) => task.assignedTo === userId);
  }
}

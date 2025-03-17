import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  async save(task: Task): Promise<void> {
    const existingTaskIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (existingTaskIndex >= 0) {
      this.tasks[existingTaskIndex] = task; // Actualizar la tarea existente
    } else {
      this.tasks.push(task); // Agregar una nueva tarea
    }
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

  async delete(taskId: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}

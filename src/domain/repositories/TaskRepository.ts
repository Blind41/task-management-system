import { Task } from "../entities/Task";

export interface TaskRepository {
  save(task: Task): Promise<void>;
  findById(id: string): Promise<Task | null>;
  findAll(): Promise<Task[]>;
  findByStatus(status: string): Promise<Task[]>;
  findByUser(userId: string): Promise<Task[]>;
  delete(taskId: string): Promise<void>;
}

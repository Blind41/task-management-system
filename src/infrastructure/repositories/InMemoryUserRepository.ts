import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async save(user: User): Promise<void> {
    const existingTaskIndex = this.users.findIndex((t) => t.id === user.id);
    if (existingTaskIndex >= 0) {
      this.users[existingTaskIndex] = user;
    } else {
      this.users.push(user);
    }
  }
  async findById(userId: string): Promise<User | null> {
    return this.users.find((user) => user.id === userId) || null;
  }
  async findByName(userName: string): Promise<User | null> {
    return this.users.find((user) => user.name === userName) || null;
  }
  async delete(userId: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== userId);
  }
}

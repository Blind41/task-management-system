import { User } from "../entities/User";

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(userId: string): Promise<User | null>;
  findByName(userName: string): Promise<User | null>;
  delete(userId: string): Promise<void>;
}

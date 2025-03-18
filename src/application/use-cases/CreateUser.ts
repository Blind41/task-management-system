import { User, UserModel } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserFactory } from "../factories/UserFactory";

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userModel: Omit<UserModel, "createdAt">): Promise<User> {
    if (!userModel.id || !userModel.name) {
      throw new Error("ID and Name are required.");
    }
    const user = UserFactory.createNewUser(userModel.id, userModel.name);
    await this.userRepository.save(user);
    return user;
  }
}

import { User, UserModel } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { NewUserFactory } from "../factories/UserFactory";

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userModel: Omit<UserModel, "createdAt">): Promise<User> {
    if (!userModel.id || !userModel.name) {
      throw new Error("ID and Name are required.");
    }

    const factory = new NewUserFactory();
    const user = factory.createUser(userModel);

    await this.userRepository.save(user);

    return user;
  }
}

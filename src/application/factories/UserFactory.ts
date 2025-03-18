import { User, UserModel } from "../../domain/entities/User";

export class UserFactory {
  static createNewUser(id: string, name: string): User {
    return new User({
      id,
      name,
      createdAt: new Date(),
    });
  }
  static createExistingUser(userModel: UserModel): User {
    return new User(userModel);
  }
}

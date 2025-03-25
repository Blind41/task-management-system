import { User, UserModel } from "../../domain/entities/User";

abstract class UserFactory {
  abstract createUser(userModel: UserModel): User;
}

export class NewUserFactory extends UserFactory {
  createUser(userModel: Omit<UserModel, "createdAt">): User {
    return new User({
      id: userModel.id,
      name: userModel.name,
      createdAt: new Date(),
    });
  }
}

export class ExistingUserFactory extends UserFactory {
  createUser(userModel: UserModel): User {
    return new User(userModel);
  }
}

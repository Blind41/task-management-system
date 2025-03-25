import { UserModel } from "../../domain/entities/User";
import { ExistingUserFactory, NewUserFactory } from "./UserFactory";

describe("User Factory", () => {
  it("should create a new User", () => {
    const data = { id: "1", name: "Andres" };

    const newUser = new NewUserFactory().createUser(data);

    expect(newUser.id).toBe("1");
    expect(newUser.name).toBe("Andres");
    expect(newUser.createdAt.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it("should create an User with existing data", () => {
    const data: UserModel = {
      id: "2",
      name: "Jennifer",
      createdAt: new Date(),
    };

    const user = new ExistingUserFactory().createUser(data);

    expect(user.id).toBe("2");
    expect(user.name).toBe("Jennifer");
    expect(user.createdAt.getTime()).toBeLessThanOrEqual(Date.now());
  });
});

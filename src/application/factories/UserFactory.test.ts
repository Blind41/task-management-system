import { UserFactory } from "./UserFactory";

describe("User Factory", () => {
  it("should create a new User", () => {
    const newUser = UserFactory.createNewUser("1", "Andres");

    expect(newUser.id).toBe("1");
    expect(newUser.name).toBe("Andres");
    expect(newUser.createdAt.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it("should create an User with existing data", () => {
    const data = { id: "2", name: "Jennifer", createdAt: new Date() };

    const user = UserFactory.createExistingUser(data);

    expect(user.id).toBe("2");
    expect(user.name).toBe("Jennifer");
    expect(user.createdAt.getTime()).toBeLessThanOrEqual(Date.now());
  });
});

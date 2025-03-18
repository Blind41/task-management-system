import { UserFactory } from "../../application/factories/UserFactory";

describe("UserFactory", () => {
  it("should create a new User", () => {
    const user = UserFactory.createNewUser("1", "Andres");

    expect(user.id).toBe("1");
    expect(user.name).toBe("Andres");
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.createdAt.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it("should create a new User with specific data", () => {
    const userData = {
      id: "4",
      name: "Lucia",
      createdAt: new Date("2025-03-15T12:00:00Z"),
    };

    const user = UserFactory.createExistingUser(userData);

    expect(user.id).toBe("4");
    expect(user.name).toBe("Lucia");
    expect(user.createdAt).toEqual(new Date("2025-03-15T12:00:00Z"));
  });
});

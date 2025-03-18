import { User } from "./User";

describe("User", () => {
  it("should create a new User", () => {
    const userData = {
      id: "1",
      name: "Nicolas",
      createdAt: new Date("2025-03-15T12:00:00Z"),
    };

    const user = new User(userData);

    expect(user.id).toBe("1");
    expect(user.name).toBe("Nicolas");
    expect(user.createdAt).toEqual(new Date("2025-03-15T12:00:00Z"));
  });
});

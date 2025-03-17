import { TaskStatus } from "./TaskStatus";

describe("TaskStatus", () => {
  it("should create a valid TaskStatus", () => {
    const status = new TaskStatus("pending");
    expect(status.getValue()).toBe("pending");
  });

  it("should throw an error for an invalid status", () => {
    expect(() => new TaskStatus("invalid-status")).toThrow(
      "Invalid status: invalid-status"
    );
  });

  it("should compare two TaskStatus objects", () => {
    const status1 = new TaskStatus("pending");
    const status2 = new TaskStatus("pending");
    const status3 = new TaskStatus("completed");
    expect(status1.equals(status2)).toBe(true);
    expect(status1.equals(status3)).toBe(false);
  });
});

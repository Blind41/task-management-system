import { Task } from "./Task";
import { TaskStatus } from "../value-objects/TaskStatus";

describe("Task", () => {
  it("should create a task", () => {
    const task = new Task({
      id: "1",
      title: "Test Task",
      description: "This is a test task",
      status: new TaskStatus("pending"), // Usamos el Value Object
      assignedTo: "user1",
    });
    expect(task.title).toBe("Test Task");
    expect(task.status.getValue()).toBe("pending");
  });
});

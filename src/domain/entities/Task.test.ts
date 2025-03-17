import { Task } from "./Task";
import { TaskStatus } from "../value-objects/TaskStatus";

describe("Task", () => {
  it("should create a task", () => {
    const task = new Task({
      id: "1",
      title: "Test Task",
      description: "This is a test task",
      status: new TaskStatus("pending"),
      assignedTo: "user1",
    });
    expect(task.title).toBe("Test Task");
    expect(task.status.getValue()).toBe("pending");
  });

  it("should update task properties", () => {
    const task = new Task({
      id: "1",
      title: "Test Task",
      description: "This is a test task",
      status: new TaskStatus("pending"),
      assignedTo: "user1",
    });

    task.updateTitle("Updated Title");
    task.updateDescription("Updated Description");
    task.updateStatus(new TaskStatus("in-progress"));

    expect(task.title).toBe("Updated Title");
    expect(task.description).toBe("Updated Description");
    expect(task.status.getValue()).toBe("in-progress");
  });
});

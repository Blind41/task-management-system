import { TaskFactory } from "./TaskFactory";

describe("Task Factory", () => {
  it("should create a Task using TaskFactory", () => {
    const task = TaskFactory.createNewTask(
      "1",
      "New Task",
      "This is a new task",
      "Andres"
    );

    expect(task.id).toBe("1");
    expect(task.title).toBe("New Task");
    expect(task.description).toBe("This is a new task");
    expect(task.assignedTo).toBe("Andres");
    expect(task.status.getValue()).toBe("pending");
  });
});

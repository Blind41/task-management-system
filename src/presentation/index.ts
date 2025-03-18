import express, { Request, Response } from "express";
import { CreateTask } from "../application/use-cases/CreateTask";
import { UpdateTask } from "../application/use-cases/UpdateTask";
import { DeleteTask } from "../application/use-cases/DeleteTask";
import { InMemoryTaskRepository } from "../infrastructure/repositories/InMemoryTaskRepository";
import { TaskStatus } from "../domain/value-objects/TaskStatus";
import { InMemoryUserRepository } from "../infrastructure/repositories/InMemoryUserRepository";
import { CreateUser } from "../application/use-cases/CreateUser";

const app = express();
app.use(express.json());

const taskRepository = new InMemoryTaskRepository();
const userRepository = new InMemoryUserRepository();

const createUser = new CreateUser(userRepository);
const createTask = new CreateTask(taskRepository, userRepository);
const updateTask = new UpdateTask(taskRepository);
const deleteTask = new DeleteTask(taskRepository);

app.post("/users", async (req, res): Promise<void> => {
  const { id, name } = req.body;
  const user = await createUser.execute({ id, name });
  res.status(201).json(user);
});

app.post("/tasks", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, title, description, assignedTo } = req.body;

    const task = await createTask.execute({
      id,
      title,
      description,
      assignedTo,
    });

    if (!task) {
      res.status(404).json({ error: "Task could not be created." });
      return;
    }

    res.status(201).json(task);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Title and Description are required.") {
        res.status(400).json({ error: error.message });
      } else if (error.message === "User not found.") {
        res.status(404).json({ error: error.message });
      }
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
});

app.put(
  "/tasks/:id",
  async (
    req: Request<
      { id: string },
      any,
      { title?: string; description?: string; status?: string }
    >,
    res: Response
  ): Promise<void> => {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    const taskStatus = new TaskStatus(status || "pending");

    const updatedTask = await updateTask.execute(taskId, {
      title,
      description,
      status: taskStatus,
    });

    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json(updatedTask);
  }
);

app.delete(
  "/tasks/:id",
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const taskId = req.params.id;
    const isDeleted = await deleteTask.execute(taskId);
    if (!isDeleted) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(204).send();
  }
);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

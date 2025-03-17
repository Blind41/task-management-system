import express, { Request, Response } from "express";
import { CreateTask } from "../application/use-cases/CreateTask";
import { UpdateTask } from "../application/use-cases/UpdateTask";
import { DeleteTask } from "../application/use-cases/DeleteTask";
import { InMemoryTaskRepository } from "../infrastructure/repositories/InMemoryTaskRepository";
import { TaskStatus } from "../domain/value-objects/TaskStatus";

const app = express();
app.use(express.json());

const taskRepository = new InMemoryTaskRepository();
const createTask = new CreateTask(taskRepository);
const updateTask = new UpdateTask(taskRepository);
const deleteTask = new DeleteTask(taskRepository);

// Crear una tarea
app.post("/tasks", async (req: Request, res: Response): Promise<void> => {
  const { title, description, assignedTo } = req.body;
  const task = await createTask.execute({ title, description, assignedTo });
  res.status(201).json(task);
});

// Actualizar una tarea
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

    // Convertir el estado a un Value Object
    const taskStatus = new TaskStatus(status || "pending");

    const updatedTask = await updateTask.execute(taskId, {
      title,
      description,
      status: taskStatus,
    });

    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
      return; // Devuelve void explícitamente
    }

    res.json(updatedTask);
  }
);

// Eliminar una tarea
app.delete(
  "/tasks/:id",
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const taskId = req.params.id;
    const isDeleted = await deleteTask.execute(taskId);
    if (!isDeleted) {
      res.status(404).json({ error: "Task not found" });
      return; // Devuelve void explícitamente
    }
    res.status(204).send();
  }
);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

import express from "express";
import { CreateTask } from "../application/use-cases/CreateTask";
import { InMemoryTaskRepository } from "../infrastructure/repositories/InMemoryTaskRepository";

const app = express();
app.use(express.json());

const taskRepository = new InMemoryTaskRepository();
const createTask = new CreateTask(taskRepository);

app.post("/tasks", async (req, res) => {
  const { title, description, assignedTo } = req.body;
  const task = await createTask.execute({ title, description, assignedTo });
  res.status(201).json(task);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

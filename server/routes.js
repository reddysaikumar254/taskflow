// server/routes.js
import express from "express";
import { storage } from "./storage.js";

export async function registerRoutes(httpServer, app) {
  const router = express.Router();

  // AUTH routes mounted in index.js (authRouter)
  // HEALTH
  router.get("/health", (req, res) => {
    res.json({ ok: true });
  });

  // USERS
  router.post("/users", async (req, res) => {
    try {
      const { username, name } = req.body;
      if (!username || !name) return res.status(400).json({ error: "username and name required" });
      const user = await storage.createUser({ username, name });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: "internal error" });
    }
  });
  router.get("/users/:id", async (req, res) => {
    const user = await storage.getUser(req.params.id);
    if (!user) return res.status(404).json({ error: "not found" });
    res.json(user);
  });
  router.get("/users/by-username/:username", async (req, res) => {
    const user = await storage.getUserByUsername(req.params.username);
    if (!user) return res.status(404).json({ error: "not found" });
    res.json(user);
  });

  // TASKS
  router.post("/tasks", async (req, res) => {
    try {
      const task = await storage.createTask(req.body);
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ error: "internal error" });
    }
  });
  router.get("/tasks", async (req, res) => {
    const tasks = await storage.getTasks();
    res.json(tasks);
  });
  router.get("/tasks/:id", async (req, res) => {
    const task = await storage.getTask(req.params.id);
    if (!task) return res.status(404).json({ error: "not found" });
    res.json(task);
  });
  router.put("/tasks/:id", async (req, res) => {
    const updated = await storage.updateTask(req.params.id, req.body);
    res.json(updated);
  });
  router.delete("/tasks/:id", async (req, res) => {
    await storage.deleteTask(req.params.id);
    res.status(204).end();
  });

  app.use("/api", router);
  return httpServer;
}

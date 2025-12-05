// server/storage.js
let users = [];
let tasks = [];

export const storage = {
  async createUser(user) {
    const newUser = { id: Date.now().toString(), ...user };
    users.push(newUser);
    return newUser;
  },
  async getUser(id) { return users.find(u => u.id === id); },
  async getUserByUsername(username) { return users.find(u => u.username === username); },

  async createTask(task) {
    const newTask = { id: Date.now().toString(), ...task };
    tasks.push(newTask);
    return newTask;
  },
  async getTasks() { return tasks; },
  async getTask(id) { return tasks.find(t => t.id === id); },
  async updateTask(id, data) {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    tasks[idx] = { ...tasks[idx], ...data };
    return tasks[idx];
  },
  async deleteTask(id) { tasks = tasks.filter(t => t.id !== id); },
};

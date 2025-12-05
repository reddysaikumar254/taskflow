// server/auth.js
import express from "express";
export const authRouter = express.Router();

// Simple in-memory users store (for dev). Replace with DB as needed.
const users = [];

// REGISTER
authRouter.post("/register", (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.json({ success: false, message: "Full name, email and password required" });
  }

  // If user already exists (by email), respond with error
  if (users.find(u => u.email === email)) {
    return res.json({ success: false, message: "User already exists" });
  }

  const user = { id: Date.now().toString(), fullName, email, password };
  users.push(user);

  // Return sanitized user (no password)
  const safeUser = { fullName: user.fullName, email: user.email, id: user.id };
  return res.json({ success: true, user: safeUser });
});

// LOGIN
authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.json({ success: false, message: "Email and password required" });

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.json({ success: false, message: "Invalid credentials" });

  const safeUser = { fullName: user.fullName, email: user.email, id: user.id };
  return res.json({ success: true, user: safeUser });
});

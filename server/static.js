import express from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app) {
  const distPath = path.resolve(process.cwd(), "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}. Make sure to build the client first.`
    );
  }

  // Serve static frontend
  app.use(express.static(distPath));

  // Fallback to index.html for any unknown route
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

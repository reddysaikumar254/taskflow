import { createServer as createViteServer, createLogger } from "vite";
import viteConfig from "../vite.config.js";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import express from "express";

export async function setupVite(app) {
  const viteLogger = createLogger();

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    appType: "custom",
    server: {
      middlewareMode: true,
      hmr: { path: "/vite-hmr" },
      allowedHosts: true
    },
    customLogger: {
      ...viteLogger,
      error(msg, options) {
        viteLogger.error(msg, options);
      }
    }
  });

  // Attach Vite middleware
  app.use(vite.middlewares);

  // Serve index.html with HMR injection
  app.use("*", async (req, res, next) => {
    try {
      const filePath = path.resolve(process.cwd(), "client/index.html");
      let template = await fs.promises.readFile(filePath, "utf-8");

      // Force reload for main.jsx
      template = template.replace(
        `src="/src/main.jsx"`,
        `src="/src/main.jsx?v=${nanoid()}"`
      );

      const html = await vite.transformIndexHtml(req.originalUrl, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (err) {
      vite.ssrFixStacktrace(err);
      next(err);
    }
  });
}

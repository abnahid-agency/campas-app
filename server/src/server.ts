import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { config } from "./config/env.js";
import { auth } from "./lib/auth.js";
import apiRoutes from "./routes/index.js";

const app = express();

// Security & Parsing Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (config.corsOrigin.includes(origin) || config.corsOrigin.includes("*")) {
        return callback(null, true);
      }
      return callback(null, true); // Allow development origins
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

// Better Auth Route (mounted before json parser or using node handler as recommended by Better Auth)
app.all("/api/auth/*", toNodeHandler(auth));

// Express body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Central API Routes (mounted under /api)
app.use("/api", apiRoutes);

// Root fallback
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    name: "Campus App API",
    status: "online",
    docs: "/api/health",
  });
});

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[Unhandled Error]:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: config.nodeEnv === "development" ? err.message : undefined,
  });
});

// Start Server
if (process.env.NODE_ENV !== "test") {
  app.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port}`);
    console.log(`📡 Health Check: http://localhost:${config.port}/api/health`);
    console.log(`🔐 Better Auth: http://localhost:${config.port}/api/auth`);
  });
}

export default app;

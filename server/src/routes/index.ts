import { Router, type Request, type Response } from "express";

const router = Router();

// Health check endpoint
router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Campus API is running",
  });
});

export default router;

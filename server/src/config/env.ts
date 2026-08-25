import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  betterAuthSecret: string;
  betterAuthUrl: string;
  corsOrigin: string[];
}

function validateEnv(): Config {
  const missingVars: string[] = [];

  if (!process.env.DATABASE_URL) {
    missingVars.push("DATABASE_URL");
  }

  if (!process.env.BETTER_AUTH_SECRET) {
    missingVars.push("BETTER_AUTH_SECRET");
  }

  if (missingVars.length > 0) {
    throw new Error(
      `[Config Error] Missing required environment variables: ${missingVars.join(
        ", "
      )}. Please check your .env file.`
    );
  }

  const port = parseInt(process.env.PORT || "3000", 10);
  const nodeEnv = process.env.NODE_ENV || "development";
  const betterAuthUrl = process.env.BETTER_AUTH_URL || `http://localhost:${port}`;
  const corsOrigin = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
    : ["http://localhost:8081", `http://localhost:${port}`];

  return {
    port,
    nodeEnv,
    databaseUrl: process.env.DATABASE_URL!,
    betterAuthSecret: process.env.BETTER_AUTH_SECRET!,
    betterAuthUrl,
    corsOrigin,
  };
}

export const config = validateEnv();

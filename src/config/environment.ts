import "dotenv/config";
import { z } from "zod";

const EnvironmentSchema = z.object({
  PORT: z.string().optional().default("8080"),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string().optional(),
  DB_NAME:z.string(),
  JWT_SECRET:z.string()
});

export const env = EnvironmentSchema.parse(process.env);

import "dotenv/config";
import { z } from "zod";

const EnvironmentSchema = z.object({
    PORT:z.string().optional().default("8080"),
})


export const env = EnvironmentSchema.parse(process.env)
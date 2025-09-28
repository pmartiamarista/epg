import { z } from "zod";

const envSchema = z.object({
  // API Configuration
  VITE_API_URL: z.url(),
});

// Parse and validate the environment variables
// This will throw at build time if validation fails
export const validatedEnv = envSchema.parse(import.meta.env);

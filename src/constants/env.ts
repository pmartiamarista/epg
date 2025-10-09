import * as v from "valibot";

const envSchema = v.object({
  // API Configuration
  VITE_API_URL: v.pipe(v.string(), v.url()),
});

// Parse and validate the environment variables
// This will throw at build time if validation fails
export const validatedEnv = v.parse(envSchema, import.meta.env);

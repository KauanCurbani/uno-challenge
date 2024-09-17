import { z } from "zod";

const envSchema = z.object({
  VITE_GRAPHQL_URI: z.string({ required_error: "VITE_GRAPHQL_URI is required" }),
});

export const env = envSchema.parse(import.meta.env);

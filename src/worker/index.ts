import { Hono } from "hono";

// Define Env interface for Cloudflare Workers
interface Env {
  DB: D1Database;
  // Add other environment variables as needed
}

const app = new Hono<{ Bindings: Env }>();

export default app;

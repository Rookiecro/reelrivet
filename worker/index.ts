import { Worker } from "bullmq";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.error("Missing REDIS_URL env var.");
  process.exit(1);
}

console.log("ReelRivet worker starting...");

const worker = new Worker(
  "render",
  async (job) => {
    console.log("Got job:", job.id, job.name, job.data);
    return { ok: true };
  },
  { connection: { url: redisUrl } }
);

worker.on("ready", () => console.log("Worker ready (connected to Redis)."));
worker.on("failed", (job, err) => console.error("Job failed:", job?.id, err));

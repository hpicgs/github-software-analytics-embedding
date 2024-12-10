import "dotenv/config";

import { storeInGitHub } from "./github-storage.js";
import logger from "./logger.js";

if (!process.env.REPOSITORY_PATH) {
  throw new Error("REPOSITORY_PATH environment variable is not set");
}
let metrics_path = "/metrics/metrics.json";
if (!process.env.METRICS_PATH) {
  logger.warn("Using default METRICS_PATH /metrics/metrics.json")
} else {
  metrics_path = process.env.METRICS_PATH;
}
logger.info(`REPOSITORY_PATH="${process.env.REPOSITORY_PATH}"`);
logger.info(`METRICS_PATH="${process.env.METRICS_PATH}"`)

const benchmark = Boolean(process.env.BENCHMARK);
if (benchmark) logger.info(`Perform benchmarking of operations`);

storeInGitHub(metrics_path, benchmark).catch((e) => {
  logger.error(e);
  process.exit(1);
});

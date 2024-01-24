import "dotenv/config";

//import { analyseRepository } from "./typescript-analysis";
import { storeInGitHub } from "./github-storage";

if (!process.env.REPOSITORY_PATH) {
  throw new Error("REPOSITORY_PATH environment variable is not set");
}
let metrics_path = "/metrics/metrics.json";
if (!process.env.METRICS_PATH) {
  console.warn("Using default METRICS_PATH /metrics/metrics.json")
} else {
  metrics_path = process.env.METRICS_PATH;
}
console.log(`REPOSITORY_PATH="${process.env.REPOSITORY_PATH}"`);
console.log(`METRICS_PATH="${process.env.METRICS_PATH}"`)

const benchmark = Boolean(process.env.BENCHMARK);
console.log(`Perform benchmarking of operations`);

// analyseRepository(process.env.REPOSITORY_PATH, 'metrics.csv', benchmark).catch((e) => {
//   console.error(e);
//   process.exit(1);
// });

storeInGitHub(metrics_path, benchmark).catch((e) => {
  console.error(e);
  process.exit(1);
});
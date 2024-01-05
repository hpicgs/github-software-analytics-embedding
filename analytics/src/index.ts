import "dotenv/config";

import { analyseRepository } from "./typescript-analysis";
import { storeInGitHub } from "./github-storage";

if (!process.env.REPOSITORY_PATH) {
  throw new Error("REPOSITORY_PATH environment variable is not set");
}
console.log(`REPOSITORY_PATH="${process.env.REPOSITORY_PATH}"`);

const benchmark = Boolean(process.env.BENCHMARK);
console.log(`Perform benchmarking of operations`);

analyseRepository(process.env.REPOSITORY_PATH, 'metrics.csv', benchmark).catch((e) => {
  console.error(e);
  process.exit(1);
});

storeInGitHub('metrics.csv', benchmark).catch((e) => {
  console.error(e);
  process.exit(1);
});
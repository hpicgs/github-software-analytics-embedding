import glob from "glob";
import { writeFileSync } from "fs";
import { promisify } from "util";
import { storeMetricsToRepo } from "./github";
import { createObjectCsvStringifier } from "csv-writer";
import { getMetrics } from "./metrics";
import { performance } from "perf_hooks";

const globPromise = promisify(glob);

async function analyseRepository(benchmark = false) {
  if (!process.env.REPOSITORY_PATH)
    throw new Error("REPOSITORY_PATH environment variable is not set");
  console.log(`REPOSITORY_PATH="${process.env.REPOSITORY_PATH}"`);
  const files = await globPromise(`${process.env.REPOSITORY_PATH}/**/*.ts`);

  console.log(files);

  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: "filename", title: "filename" },
      { id: "loc", title: "loc" }, // Lines of Code
      { id: "noc", title: "noc" }, // Number of Comments
      { id: "cloc", title: "cloc" }, //Commented Lines of Code
      { id: "dc", title: "dc" }, // Density of Comments
      { id: "nof", title: "nof" }, // Number of Functions
    ],
  });

  let timings: { [filename: string]: number } = {};
  if (benchmark) console.time("calculating-metrics");
  const metrics = files.map((filename) => {
    if (benchmark) {
      const start = performance.now();
      const m = {
        filename,
        ...getMetrics(filename),
      };
      const end = performance.now();
      timings[filename] = end - start;
      return m;
    } else {
      return {
        filename,
        ...getMetrics(filename),
      };
    }
  });
  if (benchmark) console.timeEnd("calculating-metrics");
  if (benchmark) console.log(timings);
  if (benchmark) console.time("writing-csv");

  const header = csvStringifier.getHeaderString();
  const csv = header + csvStringifier.stringifyRecords(metrics);
  writeFileSync("metrics.csv", csv);

  if (benchmark) console.timeEnd("writing-csv");
  if (benchmark) console.time("storing-in-github");
  await storeMetricsToRepo(csv);
  if (benchmark) console.timeEnd("storing-in-github");
}

const benchmark = Boolean(process.env.BENCHMARK);
analyseRepository(benchmark).catch((e) => {
  console.error(e);
  process.exit(1);
});

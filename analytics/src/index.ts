import glob from "glob";
import { writeFileSync } from "fs";
import { promisify } from "util";
import { storeMetricsToRepo } from "./github";
import { createObjectCsvStringifier } from "csv-writer";
import { getMetrics } from "./metrics";

const globPromise = promisify(glob);

async function analyseRepository() {
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

  const metrics = files.map((filename) => ({
    filename,
    ...getMetrics(filename),
  }));
  const header = csvStringifier.getHeaderString();
  const csv = header + csvStringifier.stringifyRecords(metrics);

  writeFileSync("metrics.csv", csv);
  storeMetricsToRepo(csv);
}

analyseRepository().catch((e) => {
  console.error(e);
  process.exit(1);
});

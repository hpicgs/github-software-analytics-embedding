import { parseScript, tokenize } from "esprima";
import { readFileSync, writeFileSync } from "fs";
import { promisify } from "util";
import glob from "glob";
const globPromise = promisify(glob);

async function processFiles() {
  const files = await globPromise("testfiles_ts/**/*.ts");

  console.log(files);
  const csvData = [];
  for (const filename of files) {
    const file = readFileSync(filename, "utf-8");

    const res = parseScript(file, { loc: true, comment: true });
    const tokens = tokenize(file, { loc: true });

    let loc = -1;
    let noc = res.comments?.length;
    if (res?.loc?.end && res?.loc?.start) {
      loc = res?.loc?.end?.line - res?.loc?.start?.line;
    }
    csvData.push([filename, loc, noc]);
  }
  let csv = "filename,LoC,NoC\r\n";
  for (const row of csvData) {
    csv += row.join(",") + "\r\n";
  }
  writeFileSync("metrics.csv", csv);
}

processFiles();

import { lstatSync, readdirSync, Stats, statSync, writeFileSync } from "fs";
import { promisify } from "util";
import glob from "glob";
import { storeMetricsToRepo } from "./github";
import { basename, extname, join } from "path";
import { createObjectCsvStringifier } from "csv-writer";
import { getMetrics } from "./metrics";
import {
  DirectoryNode,
  FileNode,
  Metrics,
  MetricsNode,
  NodeType,
} from "./types";

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
      { id: "loc", title: "Line of Code" },
      { id: "noc", title: "Number of Comments" },
      { id: "cloc", title: "Commented Lines of Code" },
      { id: "dc", title: "Density of Comments" },
      { id: "nof", title: "Number of Functions" },
    ],
  });

  const metrics = files.map((filename) => ({
    filename,
    ...getMetrics(filename),
  }));
  const header = csvStringifier.getHeaderString();
  const csv = header + csvStringifier.stringifyRecords(metrics);
  const metricsTree = parseRepositoryTree(process.env.REPOSITORY_PATH);
  const json = JSON.stringify(metricsTree, null, 2);

  writeFileSync("metrics.csv", csv);
  writeFileSync("metrics.json", json);

  storeMetricsToRepo(csv, json);
}

// Adopted from https://github.com/mihneadb/node-directory-tree/blob/master/lib/directory-tree.js#L21
function safeReadDirSync(path: string) {
  let dirData = [];
  try {
    dirData = readdirSync(path);
  } catch (ex: any) {
    if (ex.code == "EACCES" || ex.code == "EPERM") {
      //User does not have permissions, ignore directory
      return null;
    } else throw ex;
  }
  return dirData;
}

function reduceMetrics(children: MetricsNode[]): Metrics {
  const metricsList = children.reduce(
    (result: Metrics[], element: MetricsNode) => {
      if (element.metrics) {
        result.push(element.metrics);
      }
      return result;
    },
    []
  );

  return metricsList.reduce(
    (acc, cur) => ({
      loc: acc.loc + cur.loc,
      noc: acc.noc + cur.noc,
      cloc: acc.cloc + cur.cloc,
      //Todo this should not be accumulated
      dc: acc.dc + cur.dc,
      nof: acc.nof + cur.nof,
    }),
    { loc: 0, noc: 0, cloc: 0, dc: 0, nof: 0 }
  );
}

function parseRepositoryTree(
  path: string,
  currentDepth = 0,
  maxDepth: number | undefined = undefined
): MetricsNode | null {
  const extensions = /\.ts$/;
  const name = basename(path);

  let stats: Stats;
  let lstats: Stats;

  try {
    stats = statSync(path);
    lstats = lstatSync(path);
  } catch (e) {
    return null;
  }

  if (lstats.isSymbolicLink()) {
    // Skip symbolic links
    return null;
  }

  if (stats.isFile()) {
    const ext = extname(path).toLowerCase();

    // Skip if it does not match the extension regex
    if (extensions && !extensions.test(ext)) return null;
    const fileNode = {
      path,
      name,
      type: NodeType.FILE,
      metrics: getMetrics(path),
    } as FileNode;
    return fileNode;
  } else if (stats.isDirectory()) {
    const dirNode = { path, name, type: NodeType.DIRECTORY } as DirectoryNode;
    let dirData = safeReadDirSync(path);
    if (dirData === null) return null;

    if (maxDepth === undefined || maxDepth > currentDepth) {
      dirNode.children = dirData.reduce(
        (children: MetricsNode[], childPath: string) => {
          const child = parseRepositoryTree(
            join(path, childPath),
            currentDepth + 1
          );
          if (child) {
            children.push(child);
          }
          return children;
        },
        []
      );

      dirNode.metrics = reduceMetrics(dirNode.children);
    }
    return dirNode;
  }
  return null;
}

analyseRepository().catch((e) => {
  console.error(e);
  process.exit(1);
});

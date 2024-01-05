import "dotenv/config";

import { readFileSync } from "fs";
import { storeMetricsToRepo } from "./github";

export async function storeInGitHub(file: string, benchmark = false) {
  if (process.env.DEBUG) {
    console.log("DEBUG mode enabled, skipping GitHub storage.");
    return;
  }

  if (!process.env.GITHUB_REPOSITORY) {
    console.log("GITHUB_REPOSITORY environment variable is not set");
    return;
  }
  
  const repo_path = process.env.GITHUB_REPOSITORY;
  const [owner, repo] = repo_path.split("/");
  const commit_sha = process.env.GITHUB_SHA || "default_tag";

  if (benchmark) console.time("storing-in-github");
  const csv = readFileSync(file, 'utf8');
  await storeMetricsToRepo(csv, commit_sha, owner, repo);
  if (benchmark) console.timeEnd("storing-in-github");
}
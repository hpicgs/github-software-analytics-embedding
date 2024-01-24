import "dotenv/config";

import { Octokit } from "octokit";
import { createActionAuth } from "@octokit/auth-action";

function obtainOctokit() {
  let octokit: Octokit;
  if (process.env.GITHUB_ACTIONS) {
    console.log("Running in GitHub Actions, using @octokit/auth-action");
    octokit = new Octokit({ authStrategy: createActionAuth });
  } else {
    if (!process.env.GITHUB_TOKEN)
      throw new Error(
        "GITHUB_TOKEN environment variable is not set. This needs to be set if you want to run this script outside of GitHub Actions"
      );
    octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  }

  return octokit;
}

async function createTag(tag: string, message: string, object_sha: string, owner: string, repo: string) {
  console.log(`creating tag ${tag} - "${message}"`);

  const octokit = obtainOctokit();

  const response = await octokit.request(
    `POST /repos/${owner}/${repo}/git/tags`,
    {
      owner,
      repo,
      tag,
      message,
      object: object_sha,
      type: "blob",
    }
  );

  console.log(response);
}

async function createRef(ref: string, sha: string, owner: string, repo: string) {
  console.log(`creating ref ${ref} for metrics tree ${sha}`);

  const octokit = obtainOctokit();

  const response = await octokit.request(
    `POST /repos/${owner}/${repo}/git/refs`,
    {
      owner,
      repo,
      ref,
      sha,
    }
  );

  console.log(response);
}

async function createBlob(content: string, owner: string, repo: string) {
  console.log(`creating blob with content: ${content.substring(0, 10)} ...`);

  const octokit = obtainOctokit();

  const response = await octokit.request(
    `POST /repos/${owner}/${repo}/git/blobs`,
    {
      owner,
      repo,
      content,
      encoding: "utf-8",
    }
  );

  console.log(response);
}

async function createTree(csv: string, owner: string, repo: string): Promise<string> {
  console.log(`creating tree at ${owner}/${repo}`);

  const octokit = obtainOctokit();

  const response = await octokit.request(
    `POST /repos/${owner}/${repo}/git/trees`,
    {
      owner,
      repo,
      tree: [
        {
          path: "metrics.csv",
          mode: "100644",
          type: "blob",
          content: csv,
        },
      ],
    }
  );

  console.log(response);
  return response.data.sha;
}

export async function storeMetricsToRepo(metrics: string, commit_sha: string, owner: string, repo: string) {
  if (process.env.DEBUG) {
    console.log("DEBUG mode enabled, skipping GitHub API calls");
    return;
  }

  const tree_sha = await createTree(metrics, owner, repo);
  await createRef(`refs/metrics/${commit_sha}`, tree_sha, owner, repo);
}

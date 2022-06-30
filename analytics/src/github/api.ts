import { Octokit } from "octokit";
import { createActionAuth } from "@octokit/auth-action"
import "dotenv/config";

if (!process.env.GITHUB_REPOSITORY)
  throw new Error("GITHUB_REPOSITORY environment variable is not set");
if (!process.env.GITHUB_REPOSITORY_OWNER)
  throw new Error("GITHUB_REPOSITORY_OWNER environment variable is not set");

const repo_path = process.env.GITHUB_REPOSITORY;
const [owner, repo] = repo_path.split('/');
const commit_sha = process.env.GITHUB_SHA || "default_tag";

let octokit: Octokit;
if (process.env.GITHUB_ACTIONS) {
  console.log("Running in GitHub Actions, using @octokit/auth-action");
  octokit = new Octokit({ authStrategy: createActionAuth});
} else {
  if (!process.env.GITHUB_TOKEN)
    throw new Error("GITHUB_TOKEN environment variable is not set. This needs to be set if you want to run this script outside of GitHub Actions");
  octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
}

async function createTag(tag: string, message: string, object_sha: string) {
  console.log(`creating tag ${tag} - "${message}"`);

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

async function createBlob(content: string) {
  console.log(`creating blob with content: ${content.substring(0, 10)} ...`);

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

async function createTree(content: string): Promise<string> {
  console.log(
    `creating tree at ${owner}/${repo} with content: 
    ${content.substring(0, 10)}...`
  );

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
          content,
        },
      ],
    }
  );

  console.log(response);
  return response.data.sha;
}

export async function saveMetrics(metrics_csv: string) {
  //Todo: add the image to this call later
  const tree_sha = await createTree(metrics_csv);
  //Todo: create tag for this tree with commit hash
  const message = `HiViser Metrics and Visualisationss for commit ${commit_sha}`;
  await createTag(commit_sha, message, tree_sha);
}

import "dotenv/config";
import { Octokit } from "octokit"
import logger from "./logger.js";


async function obtainOctokit(): Promise<Octokit> {
  let octokit: Octokit;
  if (process.env.GITHUB_ACTIONS) {
    logger.debug("Running in GitHub Actions, using @octokit/auth-action");
    const { createActionAuth } = await import("@octokit/auth-action");
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
  logger.debug(`creating tag ${tag} - "${message}"`);

  const octokit = await obtainOctokit();

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

  logger.debug(response);
}

async function createRef(ref: string, sha: string, owner: string, repo: string) {
  logger.debug(`creating ref ${ref} for metrics tree ${sha}`);

  const octokit = await obtainOctokit();

  const response = await octokit.request(
    `POST /repos/${owner}/${repo}/git/refs`,
    {
      owner,
      repo,
      ref,
      sha,
    }
  );

  logger.debug(response);
}

async function createBlob(content: string, owner: string, repo: string) {
  logger.debug(`creating blob with content: ${content.substring(0, 10)} ...`);

  const octokit = await obtainOctokit();

  const response = await octokit.request(
    `POST /repos/${owner}/${repo}/git/blobs`,
    {
      owner,
      repo,
      content,
      encoding: "utf-8",
    }
  );

  logger.debug(response);
}

async function createTree(metrics: string, owner: string, repo: string): Promise<string> {
  logger.debug(`creating tree at ${owner}/${repo}`);

  const octokit = await obtainOctokit();

  const response = await octokit.request(
    `POST /repos/${owner}/${repo}/git/trees`,
    {
      owner,
      repo,
      tree: [
        {
          path: "metrics.json",
          mode: "100644",
          type: "blob",
          content: metrics,
        },
      ],
    }
  );

  logger.debug(response);
  return response.data.sha;
}

export async function storeMetricsToRepo(metrics: string, commit_sha: string, owner: string, repo: string) {
  if (process.env.DEBUG) {
    logger.debug("DEBUG mode enabled, skipping GitHub API calls");
    return;
  }

  const tree_sha = await createTree(metrics, owner, repo);
  await createRef(`refs/metrics/${commit_sha}`, tree_sha, owner, repo);
}

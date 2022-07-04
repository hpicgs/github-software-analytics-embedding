import { Octokit } from "octokit";
import { Buffer } from "buffer";
import { Endpoints } from "@octokit/types";
const octokit = new Octokit();

export async function getMetrics(
  owner: string,
  repo: string,
  commit_sha: string
): Promise<string> {
  const ref = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: `metrics/${commit_sha}`,
  });

  const tree_sha = ref.data.object.sha;
  const response = await octokit.rest.git.getTree({
    owner,
    repo,
    tree_sha,
  });

  response.data.tree.map((object) => {
    console.log(object.path);
  });

  const metrics_sha = response.data.tree.find(
    (object) => object.path === "metrics.csv"
  )?.sha;

  if (!metrics_sha) throw new Error("metrics.csv not found in tree");

  const metrics_blob = await octokit.rest.git.getBlob({
    owner,
    repo,
    file_sha: metrics_sha,
  });

  const metrics_csv = Buffer.from(
    metrics_blob.data.content,
    "base64"
  ).toString();
  console.log(metrics_csv);
  return metrics_csv;
}

export type RefsResponse =
  Endpoints["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"]["response"];

export async function getMetricCommits(
  owner: string,
  repo: string
): Promise<RefsResponse> {
  const response = await octokit.rest.git.listMatchingRefs({
    owner,
    repo,
    ref: "metrics",
  });
  console.log(response);
  return response;
}

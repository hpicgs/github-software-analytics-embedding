import { Octokit } from "octokit";
import { Buffer } from "buffer";
import { Endpoints, GetResponseTypeFromEndpointMethod } from "@octokit/types";
const octokit = new Octokit();

export async function getCommitSHA(
  owner: string,
  repo: string,
  branch: string): Promise<string> {
  
  const ref = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: `heads/${branch}`,
  });

  return ref.data.object.sha;
}

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

export type ListRefsResponseType =
  Endpoints["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"]["response"];

export async function getMetricCommits(
  owner: string,
  repo: string
): Promise<ListRefsResponseType> {
  const response = await octokit.rest.git.listMatchingRefs({
    owner,
    repo,
    ref: "metrics",
  });
  return response;
}

export type ListBranchesResponseType = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.listBranches
>;

export async function getBranches(
  owner: string,
  repo: string
): Promise<ListBranchesResponseType> {
  const response = await octokit.rest.repos.listBranches({
    owner,
    repo,
  });

  return response;
}

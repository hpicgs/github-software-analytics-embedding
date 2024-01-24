import { Octokit } from "octokit";
import { Buffer } from "buffer";
import { Endpoints, GetResponseTypeFromEndpointMethod } from "@octokit/types";
import prettyBytes from "pretty-bytes";

const octokit = new Octokit();

export async function getCommitSHA(
  owner: string,
  repo: string,
  branch: string
): Promise<string> {
  const ref = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: `heads/${branch}`,
  });

  return ref.data.object.sha;
}
interface MetricsBlob {
  content: string;
  size: number;
}

export async function getMetricsBlob(
  owner: string,
  repo: string,
  commit_sha: string,
  files: string[] = ["metrics.csv"]
): Promise<MetricsBlob[]> {
  const ref_string = `metrics/${commit_sha}`;
  console.log(ref_string);
  const ref = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: ref_string,
  });

  const tree_sha = ref.data.object.sha;
  const response = await octokit.rest.git.getTree({
    owner,
    repo,
    tree_sha,
  });

  response.data.tree.map((object) => {
    console.log(object.path, prettyBytes(object.size!));
  });

  return await Promise.all(
    files.map(async (file) => {
      const found_file = response.data.tree.find(
        (object) => object.path == file
      );

      const file_sha = found_file?.sha;
      if (!file_sha) {
        console.warn(`${file} not found in tree object`);
        return { content: "", size: 0 };
      }

      const blob = await octokit.rest.git.getBlob({
        owner,
        repo,
        file_sha,
      });

      const blob_string = Buffer.from(blob.data.content, "base64").toString();
      if (!blob_string) {
        console.warn(`${file} not found in blob object`);
        return { content: "", size: 0 };
      }
      console.log(blob_string);
      return { content: blob_string, size: blob.data.size } as MetricsBlob;
    })
  );
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

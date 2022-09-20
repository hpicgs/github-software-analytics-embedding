import Metrics from "@/components/Metrics";

type EmbedProps = {
  owner?: string;
  repo?: string;
  commitSHA?: string;
  branch?: string;
};

export default function Embed({ owner, repo, commitSHA, branch }: EmbedProps) {
  return (
    <Metrics owner={owner} repo={repo} commitSHA={commitSHA} branch={branch} />
  );
}

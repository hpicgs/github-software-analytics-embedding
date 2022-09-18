import { useParams } from "react-router-dom";
import Metrics from "./Metrics";

export default function MetricsPage() {
  const { owner, repo, commitSHA, branch } = useParams();

  return (
    <Metrics owner={owner} repo={repo} commitSHA={commitSHA} branch={branch} />
  );
}

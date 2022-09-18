import { createRoot } from "react-dom/client";
import Embed from "./Embed";

function init() {
  const container = document.createElement("div");
  document.currentScript?.parentElement?.append(container);
  const root = createRoot(container);

  const owner = document.currentScript?.getAttribute("owner") ?? undefined;
  const repo = document.currentScript?.getAttribute("repo") ?? undefined;
  const branch = document.currentScript?.getAttribute("branch") ?? undefined;
  const commitSHA =
    document.currentScript?.getAttribute("commitSHA") ?? undefined;

  root.render(
    <Embed owner={owner} repo={repo} branch={branch} commitSHA={commitSHA} />
  );
}

init();

import { createRoot } from "react-dom/client";
import Embed from "./Embed";

function init() {
  const container = document.createElement("div");
  document.currentScript?.parentElement?.append(container);
  const root = createRoot(container);

  root.render(<Embed />);
}

init();
console.log("moin");

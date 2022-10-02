import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
const basename = import.meta.env.VITE_BASE_NAME ? import.meta.env.VITE_BASE_NAME : "/";

root.render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);

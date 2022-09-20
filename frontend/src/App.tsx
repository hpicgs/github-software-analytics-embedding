import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import MetricsPage from "./components/MetricsPage";

export default function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/:owner/:repo/:commitSHA" element={<MetricsPage />} />
          <Route
            path="/:owner/:repo/branches/:branch"
            element={<MetricsPage />}
          />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

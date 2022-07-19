import Metrics from "./components/Metrics";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";


export default function App() {
  return <div className="App">
    <CssBaseline />
      <Container maxWidth="xl">
      <Routes>
        <Route path="/:owner/:repo/:commitSHA" element={<Metrics />} />
        <Route path="/:owner/:repo/branches/:branch" element={<Metrics />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Container>
  </div>;
}

import Metrics from "./components/Metrics";
import { Routes, Route, Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";


export default function App() {
  return <div className="App">
    <CssBaseline />
    <Container maxWidth="xl">
      <Routes>
        <Route path="/:owner/:repo/:commitSHA" element={<Metrics />} />
      </Routes>
    </Container>
  </div>;
}

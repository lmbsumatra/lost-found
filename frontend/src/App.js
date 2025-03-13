import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewMatch from "./pages/public/matches/ViewMatch";
import Home from "./pages/public/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lost-item" />
        <Route path="/found-item" />
        <Route path="/matches" element={<ViewMatch />} />
      </Routes>
    </Router>
  );
}

export default App;

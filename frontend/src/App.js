import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewMatch from "./pages/public/matches/ViewMatch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" />
        <Route path="/lost-item" />
        <Route path="/found-item" />
        <Route path="/matches" element={<ViewMatch />} />
      </Routes>
    </Router>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Board from "./pages/Board";
import Gallery from "./pages/Gallery";
import Wiki from "./pages/Wiki";
import Navabar from "./components/Navbar";

function App() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Board />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/wiki" element={<Wiki />} />
      </Routes>

      <Navabar></Navabar>
    </div>
  );
}

export default App;

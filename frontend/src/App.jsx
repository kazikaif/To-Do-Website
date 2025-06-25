import Home from "./Home";
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Singin from "./Singin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/login" element={<Login/>} />
        <Route path="/singin" element={<Singin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

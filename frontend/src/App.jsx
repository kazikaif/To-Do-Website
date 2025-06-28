import Home from "./Home";
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Singin from "./Singin";
import Profile from "./Profile";
import Contact from "./Contact";
import About from "./About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/login" element={<Login/>} />
        <Route path="/singin" element={<Singin/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

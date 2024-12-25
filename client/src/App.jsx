import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import AboutPage from "./Pages/AboutPage";
import Signup from "./Pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;

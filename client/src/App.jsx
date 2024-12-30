import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import AboutPage from "./Pages/AboutPage";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ProductDetail from "./components/ProductDetail";
import WomenPage from "./Pages/WomenPage";
import CartPage from "./Pages/CartPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/women" element={<WomenPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default App;

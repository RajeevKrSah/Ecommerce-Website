import "./App.css";
import Home from "./Pages/Home";
import CartPage from "./Pages/CartPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useState } from "react";
import RefrshHandler from "./services/RefrshHandler";
import '@fortawesome/fontawesome-free/css/all.min.css';
import About from "./components/About"


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;

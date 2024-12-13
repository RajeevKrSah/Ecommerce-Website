import "./App.css";
import Home from "./Pages/Home";
import CartPage from "./Pages/CartPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetailsPage from "./Pages/ProductDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetailsPage/>} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

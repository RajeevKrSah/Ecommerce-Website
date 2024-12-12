import "./App.css";
import Home from "./Pages/Home";
import CartPage from "./Pages/CartPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/404";
import Layout from "./components/layout";
import Products from "./pages/products";
import Orders from "./pages/orders";
import CartPage from "./pages/Cart";
import UserLayout from "./components/layout-user";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/skincare" element={<div>Skincare Page</div>} />
          <Route path="/pele" element={<div>Pele Page</div>} />
          <Route path="/olhos" element={<div>Olhos Page</div>} />
          <Route path="/boca" element={<div>Boca Page</div>} />
          <Route path="/vegan" element={<div>Vegan Page</div>} />
        </Route>

        <Route path="/admin" element={<ProtectedRoute element={<Layout />} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

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

function App() {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user")!);
  const isAuthenticated = !!token;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Dashboard />}
            />
          }
        />
        <Route path="/skincare" element={<div>Skincare Page</div>} />
        <Route path="/pele" element={<div>Pele Page</div>} />
        <Route path="/olhos" element={<div>Olhos Page</div>} />
        <Route path="/boca" element={<div>Boca Page</div>} />
        <Route path="/vegan" element={<div>Vegan Page</div>} />
        <Route path="/cart" element={<div>Cart Page</div>} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated && user.role === "ADMIN"}
              element={<Layout />}
            />
          }
        >
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

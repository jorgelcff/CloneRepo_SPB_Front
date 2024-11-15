// src/components/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

const Sidebar: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user")!);

  return (
    <div className="sidebar">
      <div className="img-group">
        <img
          src="https://front-bmq.vercel.app/midia/logo2.png"
          alt="logo"
          className="image"
        />
      </div>
      <div className="avatar-group">
        <img
          src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
          alt="Avatar"
        />
        <h3>{user.user.nome}</h3>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/products"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={(e) => e.preventDefault()}
              style={{ pointerEvents: "none", color: "gray" }}
            >
              Produtos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Pedidos
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

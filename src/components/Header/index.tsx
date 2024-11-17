import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Header: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user")!);

  return (
    <header className="header">
      <div className="logo-container">
        <img
          src="https://front-bmq.vercel.app/midia/logo2.png"
          className="logo"
          alt="Logo Bem me quer"
        />
      </div>
      <nav className="navbar-container">
        <ul className="navbar">
          <li>
            <Link to="/skincare">Skincare</Link>
          </li>
          <li>
            <Link to="/pele">Pele</Link>
          </li>
          <li>
            <Link to="/olhos">Olhos</Link>
          </li>
          <li>
            <Link to="/boca">Boca</Link>
          </li>
          <li>
            <Link to="/vegan">Vegan</Link>
          </li>
        </ul>
      </nav>
      <div className="navbar-container">
        <form className="search-form" action="#" method="get">
          <input
            type="text"
            className="search-input"
            placeholder="Pesquisar..."
          />
        </form>
      </div>
      <div className="user-info">
        {user ? (
          <div className="user-details">
            <img
              className="user-avatar"
              src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
              alt="Avatar"
            />
            <span className="user-name"> Olá, {user.name}</span>
            <Link to="/cart" className="cart-icon">
              <img
                src="https://cdn.icon-icons.com/icons2/1147/PNG/512/1486486306-arrow-cart-commerce-shopping-up-upload_81215.png"
                alt="Cart"
              />
            </Link>
          </div>
        ) : (
          <div className="login-link">
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

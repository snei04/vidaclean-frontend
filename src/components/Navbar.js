import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="main-header">
      <nav className="main-navbar">
        <div className="navbar-container">
          <NavLink to="/" className="navbar-logo">
            <img src={require('../images/Logo.png')} alt="Logo" />

          </NavLink>
          <ul className="navbar-menu">
            <li><NavLink to="/">Catálogo</NavLink></li>
            <li><NavLink to="/quienes-somos">Quiénes Somos</NavLink></li>
            <li><NavLink to="/proceso-fabricacion">Fabricación</NavLink></li>
            <li><NavLink to="/distribuidores">Ser Distribuidor</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/admin/login" className="navbar-admin-link">Admin</NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
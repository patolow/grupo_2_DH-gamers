import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../DH-gamers_Logo-final.png";

function Sidebar() {
  return (
    <div className='sidebar-container'>
      <img src={Logo} alt="img" className="logo-sidebar"/>
      <ul style={{ listStyleType: 'none', padding: 0, marginTop: 100 }}>
        <li><Link exact="true" to="/" className='nav-link'>DASHBOARD</Link></li>
        <li><Link to="/products" className='nav-link'>PRODUCTOS</Link></li>
        <li><Link to="/users" className='nav-link'>USUARIOS</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;


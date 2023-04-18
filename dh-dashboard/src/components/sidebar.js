import React from 'react';
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div style={{ width: '10%', padding: '10px', backgroundColor: '#f0f0f0', height: '100vh' }}>
      <ul style={{ listStyleType: 'none', padding: 0, marginTop: 100 }}>
        <li><NavLink exact to="/">Dashboard</NavLink></li>
        <li><NavLink to="/api/products">Products</NavLink></li>
        <li><NavLink to="/users">Users</NavLink></li>
      </ul>
    </div>
  );
}

export default Sidebar;


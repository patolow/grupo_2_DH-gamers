import React from 'react';
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div style={{ width: '20%', padding: '10px', backgroundColor: '#f0f0f0' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li><NavLink exact to="/">Dashboard</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
        <li><NavLink to="/users">Users</NavLink></li>
      </ul>
    </div>
  );
}

export default Sidebar;

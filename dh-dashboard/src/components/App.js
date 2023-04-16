import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidebar from './Sidebar';
import MainContent from './Maincontent';
function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
      <Sidebar />
      <MainContent />
      </div>
    </Router>
  );
}

export default App;
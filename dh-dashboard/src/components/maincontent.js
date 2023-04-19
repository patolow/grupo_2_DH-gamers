import { Switch, Route } from 'react-router-dom';
import Products from './Products';
import Users from './Users';

function MainContent() {
  return (
    <div style={{ flex: 1, padding: '10px' }}>
      <Switch>
        <Route exact path="/">
          
          <h1>Welcome to DH Dashboard</h1>
          
          
        </Route>
        <Route path="/products">
        <div className='header-dashboard'>
        <h1>DASHBOARD PRODUCTOS</h1>
        </div>
        <div className="container-division">
          <Products />
          </div>
        </Route>
        <Route path="/users">
        <div className='header-dashboard'>
          <h1>DASHBOARD USUARIOS</h1>
          </div>
          <Users/>
        </Route>
      </Switch>
    </div>
  );
}

export default MainContent;

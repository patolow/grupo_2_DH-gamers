import { Switch, Route } from 'react-router-dom';
import Products from './Products';
import Users from './Users';


function MainContent() {
  return (
    <div style={{ flex: 1, padding: '10px' }}>
      <Switch>
        <Route exact path="/">
          <div className='welcome-h1'>
          <h1>DASHBOARD - DH GAMERS</h1>
          </div>
          <div className='total-boxes-container'>
            <div className='total-box'>
              <h2>TOTAL PRODUCTOS:</h2>
            </div>
            <div className='total-box'>
              <h2>TOTAL USUARIOS:</h2>
            </div>
            <div className='total-box'>
              <h2>TOTAL CATEGORIAS:</h2>
            </div>
          </div>
          
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

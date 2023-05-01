import { Switch, Route } from 'react-router-dom';
import Products from './Products';
import Users from './Users';
import Home from './Home';
import ProductDetail from './ProductDetail'


function MainContent() {
  return (
    <div style={{ flex: 1, padding: '10px' }}>
      <Switch>
        <Route exact path="/">
          <Home/>
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
        <Route path='/product/detail/'>
          <ProductDetail/>
        </Route>
      </Switch>
    </div>
  );
}

export default MainContent;

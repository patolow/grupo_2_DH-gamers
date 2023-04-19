import { Switch, Route } from 'react-router-dom';
import Products from './Products';
import Users from './Users';

function MainContent() {
  return (
    <div style={{ flex: 1, padding: '10px' }}>
      <Switch>
        <Route exact path="/">
          <h1>Welcome to DH Dashboard</h1>
          <Users/>
          <Products />
        </Route>
        <Route path="/products">
        <h1>Welcome to products</h1>
          <Products />
        </Route>
        <Route path="/users">
          <h1>Welcome to users</h1>
          <Users/>
        </Route>
      </Switch>
    </div>
  );
}

export default MainContent;

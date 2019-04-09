import React from 'react';
import { Router, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import MainPage from '../components/MainPage'
import Account from '../components/Account'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div id="app-wrapper">
      <Switch>
        <PublicRoute path="/" component={MainPage} exact={true} />
        <PrivateRoute path="/account" component={Account} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import MainPage from '../components/MainPage'
import Account from '../components/Account'

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div id="app-wrapper">
      <Switch>
        <Route path="/" component={MainPage} exact={true} />
        <Route path="/account" component={Account} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

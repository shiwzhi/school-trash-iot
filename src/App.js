import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from './components/index/index'
import Admin from './components/admin/drawer'
import Login from './components/admin/login'

import { Provider } from 'react-redux'
import store from './js/store/index'

function AppRouter() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Index} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
      </Router>
    </Provider>

  );
}

export default AppRouter;
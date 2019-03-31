import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Drawer from './components/drawer'


function AdminPage() {
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function AppRouter() {
  return (
    <Router>
      <Route path="/admin" component={Drawer} />
    </Router>
  );
}

export default AppRouter;
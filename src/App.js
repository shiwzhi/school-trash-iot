import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Index from './components/index'
import Admin from './components/admin'
import Login from './components/login'

const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3001';
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.withCredentials = true
  return config;
}, function (error) {
  // Do something with request error
  console.log("error")
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // Do something with response data

  return response;
}, function (error) {
  // Do something with response error
  var res = error.response
  console.log(res)
  if (res.status === 401) {
    console.log("401")
    window.location = "/login"
  }
  return Promise.reject(error);
});


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
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
    </Router>
  );
}

export default AppRouter;
const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3100';

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.withCredentials = true
  return config;
}, function (error) {
  // Do something with request error
  console.log("request error")
  console.log(error)
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  var res = error.response
  console.log(res)
  try {
    if (res.status === 401) {
      console.log("401")
      window.location = "/login"
    }
  } catch (error) {
    window.location = "/login"
  }

  return Promise.reject(error);
});


export default axios
const axios = require("axios");
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export default api;

import API from "../api";

const API = API.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

export default API;

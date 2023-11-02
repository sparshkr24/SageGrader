import axios from "axios";

console.log("baseurl: ", process.env.REACT_APP_BASE_URL);

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, 
  headers: {
    'Content-Type': 'application/json', 
  },
});

export default api

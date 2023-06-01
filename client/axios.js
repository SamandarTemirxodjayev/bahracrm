import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const API_URL = "http://localhost:7777/api/v1/";
let accessToken = cookies.get("token");


const headers = {
  "Authorization": `Bearer ${accessToken}`,
  "Content-Type": "application/json"
};

export const $host = axios.create({
  baseURL: API_URL,
  headers
});

$host.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 404) {
      console.log(error);
    }
    if (error.response.status === 401) {
      console.log(error);
      window.location.href = "/logout";
    }
    return Promise.reject(error);
  }
);

export default $host;

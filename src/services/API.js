import axios from 'axios';
import authService from './auth.service';

var headers;
headers = {

    'Content-Type': 'application/json'
  };

export const axiosInstance = axios.create({
  headers: headers,
  timeout: 20000,
});

export const baseUrl = "https://live.blink.co.ke";
//export const baseUrl = "http://test.blink.co.ke";
// export const baseUrl = "http://localhost:8081";

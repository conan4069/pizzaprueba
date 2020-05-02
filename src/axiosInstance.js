import axios from "axios";

let authentication = {
  'currency': 'USD'
}
let token = localStorage.getItem('token')
let currency = localStorage.getItem('currency')

if(token != undefined){
  authentication['Authorization'] = `Bearer ${token}`
}

if(currency != undefined){
  authentication['currency'] = currency
}

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: authentication
});
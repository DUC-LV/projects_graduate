import axios from "axios";
const baseURL = 'http://127.0.0.1:8000/';

const axiosInstances = axios.create({
    baseURL: baseURL,
    timeout: 500,
    proxy: false,
    headers: {
		'Authorization': typeof window !== 'undefined' ? "Bearer " + localStorage.getItem('access_token') : "",
		'Content-Type': 'application/json',
		'accept': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
	},
})

export default axiosInstances;

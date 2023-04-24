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

axiosInstances.interceptors.response.use(
	(response) => {
		return response;
	},
	async function(error){
		const config = error?.config;

		if(error.config.status === 401){
			const refreshToken  = localStorage.getItem("refresh_token");

			if(refreshToken){
				return axiosInstances.post('api/token/refresh', { refresh: refreshToken }).then(response => {
					localStorage.setItem("access_token", response.data.access);
					localStorage.setItem("refresh_token", response.data.refresh);

					axiosInstances.defaults.headers.common['Authorization'] =
						'Bearer ' + response.data.access;
					config.headers['Authorization'] =
						'Bearer ' + response.data.access;

					return axiosInstances(config);

				})
				.catch((err) => {
					console.log(err);
				});
			}
			else {
				window.location.href = '/login/';
			}
		}
		else {
			// window.location.href = '/login/';
		}
	}
)

export default axiosInstances;

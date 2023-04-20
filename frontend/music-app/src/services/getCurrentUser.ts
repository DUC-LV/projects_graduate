import axiosInstances from "./axiosInstances";

const getCurrentUser = {
	getAll(){
		const url = 'user-info';
		return axiosInstances(url);
	}
}

export default getCurrentUser;

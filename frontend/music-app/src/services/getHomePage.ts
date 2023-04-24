import axiosInstances from "./axiosInstances";

const getHomePage = {
	getAll(){
		const url = 'public/v1/composite/get-home';
		return axiosInstances(url);
	}
}

export default getHomePage;

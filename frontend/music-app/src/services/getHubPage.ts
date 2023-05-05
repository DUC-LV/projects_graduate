import axiosInstances from "./axiosInstances";

const getHubPage = {
	getAll(){
		const url = 'public/v1/composite/hub';
		return axiosInstances(url);
	}
}

export default getHubPage;

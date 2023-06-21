import axiosInstances from "./axiosInstances";

const getPackages = {
	getAll(){
		const url = 'public/v1/composite/package';
		return axiosInstances(url);
	}
}

export default getPackages;

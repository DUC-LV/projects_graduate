import axiosInstances from "./axiosInstances";

const getTop100Page = {
	getAll(){
		const url = 'public/v1/composite/get-top100';
		return axiosInstances(url);
	}
}

export default getTop100Page;

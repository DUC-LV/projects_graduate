import axiosInstances from "./axiosInstances";

const getRadioPage = {
	getAll(){
		const url = 'public/v1/composite/get-radio';
		return axiosInstances(url);
	}
}

export default getRadioPage;

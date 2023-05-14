import axiosInstances from "./axiosInstances";

const getTopicDetail = {
	getAll(id: number){
		const url = `hub/${id}`;
		return axiosInstances(url);
	}
}

export default getTopicDetail;

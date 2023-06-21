import axiosInstances from "./axiosInstances";

const getVideoDetail = {
	getAll(id: number){
		const url = `video/${id}`;
		return axiosInstances(url);
	}
}

export default getVideoDetail;

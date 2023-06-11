import axiosInstances from "./axiosInstances";

const getStreamingDetail = {
	getAll(id: number){
		const url = `streaming/${id}`;
		return axiosInstances(url);
	}
}

export default getStreamingDetail;

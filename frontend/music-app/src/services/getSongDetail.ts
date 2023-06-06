import axiosInstances from "./axiosInstances";

const getSongDetail = {
	getAll(id: number){
		const url = `song/${id}`;
		return axiosInstances(url);
	}
}

export default getSongDetail;

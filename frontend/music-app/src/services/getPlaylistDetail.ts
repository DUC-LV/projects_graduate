import axiosInstances from "./axiosInstances";

const getPlaylistDetail = {
	getAll(id: number){
		const url = `playlist/${id}`;
		return axiosInstances(url);
	}
}

export default getPlaylistDetail;

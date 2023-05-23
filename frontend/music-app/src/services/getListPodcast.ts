import axiosInstances from "./axiosInstances";

const getListPodcast = {
	getAll(id: number){
		const url = `list-podcast-episode/${id}`;
		return axiosInstances(url);
	}
}

export default getListPodcast;

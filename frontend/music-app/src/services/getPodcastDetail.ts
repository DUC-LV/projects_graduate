import axiosInstances from "./axiosInstances";

const getPodcastDetail = {
	getAll(id: number){
		const url = `podcast/${id}`;
		return axiosInstances(url);
	}
}

export default getPodcastDetail;

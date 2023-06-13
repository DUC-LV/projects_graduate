import axiosInstances from "./axiosInstances";

const getPodcastEpisodeDetail = {
	getAll(id: number){
		const url = `podcast-episode/${id}`;
		return axiosInstances(url);
	}
}

export default getPodcastEpisodeDetail;

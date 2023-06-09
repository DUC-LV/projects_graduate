import axiosInstances from "./axiosInstances";

const getRecommendSong = {
	getAll(id: number){
		const url = `song-recommend/${id}`;
		return axiosInstances(url);
	}
}

export default getRecommendSong;

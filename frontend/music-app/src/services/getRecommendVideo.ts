import axiosInstances from "./axiosInstances";

const getRecommendVideo = {
	getAll(id: number){
		const url = `video-recommend/${id}`;
		return axiosInstances(url);
	}
}

export default getRecommendVideo;

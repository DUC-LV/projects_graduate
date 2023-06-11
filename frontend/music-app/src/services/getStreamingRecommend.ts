import axiosInstances from "./axiosInstances";

const getStreamingRecommend = {
	getAll(){
		const url = 'streaming-recommend';
		return axiosInstances(url);
	}
}

export default getStreamingRecommend;

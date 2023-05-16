import axiosInstances from "./axiosInstances";

const getPodcastCategoryDetail = {
	getAll(id: number){
		const url = `podcast-category/${id}`;
		return axiosInstances(url);
	}
}

export default getPodcastCategoryDetail;

import axiosInstance from "./axiosInstances";

const getCategoryVideo = {
	getAll(id:number){
		const url = `category-video/${id}`;
		return axiosInstance.get(url)
	}
}
export default getCategoryVideo;

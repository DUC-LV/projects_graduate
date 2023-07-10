import axiosInstances from "./axiosInstances";

const getListSongAll = {
	getAll(){
		const url = 'update/song';
		return axiosInstances(url);
	}
}

export default getListSongAll;

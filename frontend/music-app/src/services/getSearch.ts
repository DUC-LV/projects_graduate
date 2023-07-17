import axiosInstances from "./axiosInstances";

const getSearch = {
	getAll(query: string){
		const url = `search?q=${query}`;
		return axiosInstances(url);
	}
}

export default getSearch;

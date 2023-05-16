import { DataPodCastCategory } from "@/schemas";
import getPodcastCategoryDetail from "@/services/getPodcastCategoryDetail";
import { Grid } from "@mui/material";
import React from "react";

type Props = {
	data: Array<DataPodCastCategory>
}

export async function getServerSideProps({ query }: any) {
	try {
		if(query?.id){
			const res = await getPodcastCategoryDetail.getAll(query?.id);
			return {
				props: {
					data: res.data.data.items,
				}
			};
		}
	} catch (error) {
		console.log(error)
	}
}
const PodcastCategory = ({ data }: Props) => {
	return(
		<Grid></Grid>
	);
}

export default PodcastCategory;

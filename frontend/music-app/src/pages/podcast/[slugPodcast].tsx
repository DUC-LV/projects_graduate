import { DataPodCast } from "@/schemas";
import getPodcastDetail from "@/services/getPodcastDetail";
import { Grid } from "@mui/material";
import React from "react";

type Props = {
	data: Array<DataPodCast>,
}

export async function getServerSideProps({ query }: any) {
	try {
		if(query?.id){
			const res = await getPodcastDetail.getAll(query.id);
			return {
				props: {
					data: res.data.data,
				}
			};
		}

	} catch (error) {
		console.log(error)
	}
}

const PodcastDetail = ({ data }: Props) => {
	console.log(data);
	return(
		<Grid></Grid>
	);
}

export default PodcastDetail;

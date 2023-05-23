import HeaderPodcastDetail from "@/components/podcast/HeaderPodcastDetail";
import ListEpisodePodcast from "@/components/podcast/ListEpisodePodcast";
import { DataPodCast, DataPodcastEpisode } from "@/schemas";
import getListPodcast from "@/services/getListPodcast";
import getPodcastDetail from "@/services/getPodcastDetail";
import { Grid } from "@mui/material";
import React from "react";

type Props = {
	dataPodcast: Array<DataPodCast>,
	dataPocastEpiside: Array<DataPodcastEpisode>,
}

export async function getServerSideProps({ query }: any) {
	try {
		if(query?.id){
			const resPodcast = await getPodcastDetail.getAll(query.id);
			const resPocastEpiside = await getListPodcast.getAll(query.id);
			return {
				props: {
					dataPodcast: resPodcast.data.data,
					dataPocastEpiside: resPocastEpiside.data.data.items,
				}
			};
		}

	} catch (error) {
		console.log(error)
	}
}

const PodcastDetail = ({ dataPodcast, dataPocastEpiside }: Props) => {
	console.log(dataPocastEpiside);
	return(
		<Grid container flexDirection="column">
			<Grid item>
				<HeaderPodcastDetail dataPodcast={dataPodcast}/>
			</Grid>
			<Grid item sx={{ marginY: '40px' }}>
				<ListEpisodePodcast dataPocastEpiside={dataPocastEpiside}/>
			</Grid>
		</Grid>
	);
}

export default PodcastDetail;

import ListSong from "@/components/ListSong";
import HeaderPlaylist from "@/components/playlist/HeaderPlaylist";
import { DataSong } from "@/schemas";
import getRecommendSong from "@/services/getRecommendSong";
import { Grid } from "@mui/material";
import axios from "axios";
import React from "react";

type Props = {
	dataSong?: DataSong,
	dataListRecommend: Array<DataSong>
}

export async function getServerSideProps({ req, query }: any) {
	const config : object = {
		headers: {
			'Authorization': 'Bearer ' + req.cookies.access_token,
			'Content-Type': 'application/json',
			'accept': 'application/json',
		},
		proxy: false
	}
	try {
		if(query?.id){
			const resDataSong = await axios.get(`http://localhost:8000/song/${query.id}`, config);
			const resDataListRecommend = await getRecommendSong.getAll(query?.id)
			return {
				props: {
					dataSong: resDataSong.data,
					dataListRecommend: resDataListRecommend.data.data,
				}
			};
		}
	} catch (error) {
		console.log(error)
	}
}

const SongDetail = ({ dataSong, dataListRecommend }: Props) => {
	console.log(dataSong?.streaming?.[128])
	return(
		<Grid container>
			<Grid item>
				<HeaderPlaylist
					id={dataSong?.id}
					thumbnail_m={dataSong?.thumbnail_m}
					title={dataSong?.title}
					artist_names={dataSong?.artist_names}
					follow={dataSong?.follow}
				/>
			</Grid>
			<Grid item container xs flexDirection="column" sx={{ overflow: 'hidden' }}>
				<Grid item sx={{ marginLeft: '25px' }}>

				</Grid>
				<Grid item>
					<ListSong data={dataListRecommend} description="Có Thể Bạn Quan Tâm"/>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default SongDetail;

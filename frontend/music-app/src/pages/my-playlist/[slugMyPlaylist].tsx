import ListSongAll from "@/components/ListSongAll";
import ListSongCreateToPlaylist from "@/components/ListSongCreateToPlaylist";
import HeaderPlaylist from "@/components/playlist/HeaderPlaylist";
import getListSongAll from "@/services/getListSongAll";
import getPlaylistDetail from "@/services/getPlaylistDetail";
import { Grid } from "@mui/material";
import React from "react";

type Props = {
	data: any,
	dataSong: any,
}

export async function getServerSideProps({ query }: any) {
	try {
		if(query?.id){
			const res = await getPlaylistDetail.getAll(query.id);
			const resSong = await getListSongAll.getAll();
			return {
				props: {
					data: res.data.data,
					dataSong: resSong.data.data,
				}
			};
		}

	} catch (error) {
		return {
			redirect: {
				destination: '/',
				statusCode: 307
			}
		}
	}
}

const MyPlaylistDetail = ({ data, dataSong }: Props) => {
	return(
		<>
		<Grid container
			sx={{
				"@media screen and (max-width: 1200px)":{
					flexDirection: 'column'
				},
			}}
		>
			<Grid item>
				<HeaderPlaylist
					id={data?.id}
					thumbnail_m={data?.thumbnail_m}
					title={data?.title}
					artist_names={data?.artist_names}
					sort_description={data?.sort_description}
					follow={data?.follow}
				/>
			</Grid>
			<Grid item xs sx={{ overflow: 'hidden' }}>
				<ListSongCreateToPlaylist data={data?.song?.items} description={data?.sort_description}/>
			</Grid>
		</Grid>
		<Grid container sx={{ marginTop: '40px' }}>
			<ListSongAll data={dataSong} description={''}/>
		</Grid>
		</>
	);
}

export default MyPlaylistDetail;

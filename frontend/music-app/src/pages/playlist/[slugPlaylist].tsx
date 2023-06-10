import ListSong from "@/components/ListSong";
import HeaderPlaylist from "@/components/playlist/HeaderPlaylist";
import getPlaylistDetail from "@/services/getPlaylistDetail";
import { Grid } from "@mui/material";
import React from "react";

type Props = {
	data: any,
}

export async function getServerSideProps({ query }: any) {
	try {
		if(query?.id){
			const res = await getPlaylistDetail.getAll(query.id);
			return {
				props: {
					data: res.data.data,
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

const PlaylistDetail = ({ data }: Props) => {
	return(
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
				<ListSong data={data?.song?.items} description={data?.sort_description}/>
			</Grid>
		</Grid>
	);
}

export default PlaylistDetail;

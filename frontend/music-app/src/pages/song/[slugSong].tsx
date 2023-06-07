import ListSong from "@/components/ListSong";
import AudioControlBar from "@/components/player/AudioControlBar";
import HeaderPlaylist from "@/components/playlist/HeaderPlaylist";
import { DataSong } from "@/schemas";
import getRecommendSong from "@/services/getRecommendSong";
import { getFullTimeFromDatetime } from "@/untils";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import Typewriter from "typewriter-effect";

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
				<Grid item container sx={{ marginLeft: '25px', flexDirection: 'column' }}>
					<Grid xs item>
						<AudioControlBar urlStremingSong={dataSong?.streaming?.[128]}/>
					</Grid>
					<Grid xs item>
						<Typography sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: 'white' }}>
							<Typewriter
								options={{
									strings: dataSong?.title,
									autoStart: true,
									loop: true,
								}}
							/>
						</Typography>
						<Box>
							<Typography sx={{ fontSize: '14px', color: 'white', fontWeight: 500}}>Thông tin bài hát</Typography>
							<Box sx={{ marginTop: '10px' }}>
								<Typography sx={{ fontSize: '13px', color: '#6d6875', fontWeight: 500}}>Tên bài hát: {dataSong?.title}</Typography>
								<Typography sx={{ fontSize: '13px', color: '#6d6875', fontWeight: 500}}>Nghệ sĩ: {dataSong?.artist_names}</Typography>
							</Box>
						</Box>
					</Grid>
				</Grid>
				<Grid item sx={{ marginTop: '40px' }}>
					<ListSong data={dataListRecommend} description="Có Thể Bạn Quan Tâm"/>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default SongDetail;

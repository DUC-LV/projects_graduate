/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { WrapperContext } from "@/containers/Layout";
import getVideoDetail from "@/services/getVideoDetail";
import getRecommendVideo from "@/services/getRecommendVideo";
import { DataVideo } from "@/schemas";
import { TextLineClamp, TextOnline } from "./Text";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ReactPlayer from "react-player";

const HeaderVideoDetail = ({ dataVideo, onClick } : { dataVideo?: DataVideo, onClick: () => void }) => {
	return(
		<Grid container>
			<Grid item container xs>
				<Grid item width="40px" sx={{ marginRight: '10px' }}>
					<img src={dataVideo?.thumbnail} alt="" style={{ height: '40px', width: '40px', borderRadius: '999px'}}/>
				</Grid>
				<Grid item container flexDirection="column" xs>
					<TextLineClamp sx={{ fontSize: '18px', fontWeight: 700, color: 'white'}} line={1}>{dataVideo?.title}</TextLineClamp>
					<TextOnline sx={{ fontSize: '14px', color: 'hsla(0,0%,100%,0.5)'}}>{dataVideo?.artist?.name}</TextOnline>
				</Grid>
			</Grid>
			<Grid item container xs justifyContent="flex-end" alignItems="center">
				<HighlightOffOutlinedIcon
					onClick={onClick}
					sx={{ color: 'white', cursor: 'pointer', height: '30px', width: '30px' }}
				/>
			</Grid>
		</Grid>
	);
}


const PlayVideo = () => {
	const { idVideo, setShowPlayVideo } = useContext(WrapperContext);
	const [dataVideo, setDataVideo] = useState<DataVideo>();
	const [dataRecommend, setDataRecommend] = useState<Array<DataVideo>>();

	useEffect(() => {
		if(idVideo){
			getVideoDetail.getAll(idVideo).then(res => {
				setDataVideo(res?.data);
			});
			getRecommendVideo.getAll(idVideo).then(res => {
				setDataRecommend(res?.data?.data);
			})
		}
	}, [idVideo])

	const toggleClosePlayVideo = useCallback(() => {
		setShowPlayVideo(false);
	}, [setShowPlayVideo])

	return(
		<Grid container height="100vh" width="100vw" flexDirection="column"
			sx={{ position: 'fixed', top: 0, left: 0, zIndex: 2, background: 'black', padding: '20px' }}>
			<Grid item container alignItems="center" height="60px" sx={{ marginBottom: '10px' }}>
				<HeaderVideoDetail
					dataVideo={dataVideo ?? dataVideo}
					onClick={toggleClosePlayVideo}
				/>
			</Grid>
			<Grid item container xs>
				<Grid item xs sx={{ width: '100%', height: '546px' }}>
					<ReactPlayer
						controls
						url={dataVideo?.streaming?.[480]}
						autoplay
						width="100%"
						height="100%"
					/>
				</Grid>
				<Grid item width="320px"></Grid>
			</Grid>
		</Grid>
	);
}

export default PlayVideo;


/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { WrapperContext } from "@/containers/Layout";
import getSongDetail from "@/services/getSongDetail";
import { DataSong } from "@/schemas";
import { TextOnline } from "./Text";
import AudioControlBar from "./player/AudioControlBar";
import Typewriter from "typewriter-effect";
import FavoriteIcon from '@mui/icons-material/Favorite';
import axiosInstances from "@/services/axiosInstances";
import { toast } from "react-toastify";

const PlayMusic = () => {
	const { id, type, setShowListSong, showListSong } = useContext(WrapperContext);
	const [data, setData] = useState<DataSong>();
	const [like, setLike] = useState(false);

	useEffect(() => {
		if(id){
			getSongDetail.getAll(id).then(res => {
				setData(res?.data);
			})
		}
	}, [id])

	useEffect(() => {
		if (data?.follow?.length === 0) {
			setLike(false);
		} else if (data?.follow?.length === 1) {
			setLike(true);
		}
	}, [data?.follow?.length])

	const toggleLike = useCallback(() => {
		setLike(!like);
		axiosInstances.post('update-follow', { song_id: data?.id ?? '' }).then(res => {
			toast.success(res?.data?.msg)
		})
	}, [data?.id, like])

	const toggleShowListSong = useCallback(() => {
		if(type === 'song'){
			setShowListSong(!showListSong);
		}else if(type === 'podcast') {
			setShowListSong(false);
		}
	}, [setShowListSong, showListSong, type])

	return(
		<Grid container
			onClick={toggleShowListSong}
			sx={{
				position: 'fixed',
				bottom: 0,
				left: 0,
				color: 'white',
				height: '80px',
				width: '100%',
				background: '#170f23',
				zIndex: 2,
				padding: '6px',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}>
			<Grid xs item container alignItems="center">
				<Grid item>
					<img alt="" src={data?.thumbnail} style={{ height: '64px', width: '64px', borderRadius: '8px', cursor: 'pointer'}}/>
				</Grid>
				<Grid item flexDirection="column" sx={{ marginLeft: '12px' }}>
					<TextOnline sx={{ fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>
						{data?.title}
					</TextOnline>
					<TextOnline sx={{ fontSize: '11px', fontWeight: 400, color: '#ffffff80' }}>
						{data?.artist_names}
					</TextOnline>
				</Grid>
			</Grid>
			<Grid xs item container justifyContent="center" flexDirection="column">
				<Grid item>
					<Typography sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: 'white' }}>
						<Typewriter
							options={{
								strings: data?.title,
								autoStart: true,
								loop: true,
							}}
						/>
					</Typography>
				</Grid>
				<Grid item>
					<AudioControlBar urlStremingSong={data?.streaming?.[128]}/>
				</Grid>
			</Grid>
			<Grid xs item container justifyContent="end">
				<FavoriteIcon sx={{ color:  like ? '#9b4de0' : 'white', cursor: 'pointer' }} onClick={toggleLike}/>
			</Grid>
		</Grid>
	);
}

export default PlayMusic;

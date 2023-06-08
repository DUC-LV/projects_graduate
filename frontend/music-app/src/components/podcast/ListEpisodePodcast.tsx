/* eslint-disable @next/next/no-img-element */
import { DataPodcastEpisode } from "@/schemas";
import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { TextLineClamp } from "../Text";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { convertDuration, getFullTimeFromDatetime } from "@/untils";
import axiosInstances from "@/services/axiosInstances";
import { toast } from "react-toastify";

type Props = {
	dataPocastEpisode?: Array<DataPodcastEpisode>| any;
}

type props = {
	item: DataPodcastEpisode
}

export const PocastEpisideItem = ({ item }: props) => {
	const [like, setLike] = useState(false);

	useEffect(() => {
		if (item?.follow?.length === 0) {
			setLike(false);
		} else if (item?.follow?.length === 1) {
			setLike(true);
		}
	}, [item?.follow?.length])

	const toggleLike = useCallback(() => {
		setLike(!like);
		axiosInstances.post('update-follow', { podcast_episode_id: item.id ?? '' }).then(res => {
			toast.success(res?.data?.msg)
		})
	}, [item.id, like])

	// const togglePlay = useCallback(() => {
	// 	localStorage.setItem("dataPlayMusic", JSON.stringify({"type": "podcast", "id": item?.id}))
	// }, [item?.id])

	return (
		<Grid item container sx={{ marginBottom: '24px', alignItems: 'center' }}>
			<Grid item sx={{ marginRight: '24px'}}>
				<img alt="" src={item?.thumbnail} style={{ borderRadius: '6px', height: '106px', width: '106px' }}/>
			</Grid>
			<Grid item xs>
				<Typography
					sx={{ fontSize: '15px', fontWeight: '600', color: 'white' }}
				>{item?.title}</Typography>
				<TextLineClamp
					line={2}
					sx={{ fontSize: '14px', fontWeight: '500', color: 'hsla(0,0%,100%,0.5)', marginY: '8px'}}
				>{item?.description}</TextLineClamp>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', width: '20%', alignItems: 'center'}}>
					<PlayCircleIcon
						style={{ color: 'white', height: '30px', width: '30px', cursor: 'pointer' }}
						// onClick={togglePlay}
					/>
					<Typography
						sx={{ fontSize: '13px', fontWeight: 500, color: 'hsla(0,0%,100%,0.5)'}}>
						{getFullTimeFromDatetime(Number(item?.release_date))}
					</Typography>
					<Typography
						sx={{ fontSize: '13px', fontWeight: 500, color: 'hsla(0,0%,100%,0.5)'}}>
						{convertDuration(Number(item?.duration))}
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
						<FavoriteIcon sx={{ color: like ? '#9b4de0' : 'white' }} onClick={toggleLike}/>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
}

const ListEpisodePodcast = ({ dataPocastEpisode }: Props) => {
	return(
		<Grid container flexDirection="column">
			<Grid item>
				<Typography
					variant="h3"
					sx={{ fontSize: '20px', fontWeight: 700, color: 'white'}}>
					Tất Cả Các Tập
				</Typography>
			</Grid>
			<Grid item container sx={{ marginTop: '20px', width: '86%' }}>
				{dataPocastEpisode?.map((item: DataPodcastEpisode, index: number) => {
					return(
						<PocastEpisideItem key={index} item={item}/>
					);
				})}
			</Grid>
		</Grid>
	);
}

export default ListEpisodePodcast;

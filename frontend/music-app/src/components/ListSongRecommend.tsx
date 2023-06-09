/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
import { WrapperContext } from "@/containers/Layout";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import getRecommendSong from "@/services/getRecommendSong";
import { Grid, Typography } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { TextLineClamp, TextOnline } from "./Text";

type props = {
	item: any
}

const SongItem = ({ item }: props) => {
	const { setShowPlayMusic, setId } = useContext(WrapperContext);
	const router = useRouter();
	const [like, setLike] = useState(false);
	const [isShow, setIsShow] = useState(false);

	const handleShowPopup = useCallback(() => {
		if(item?.streaming_status === 2){
			setIsShow(true)
		} else {
			setShowPlayMusic(true);
			setId(item?.id);
			localStorage.setItem("dataPlayMusic", JSON.stringify({"type": "song", "id": item?.id}))
		}
	}, [item?.id, item?.streaming_status, setId, setShowPlayMusic]);
	return(
		<Grid container sx={{ marginY: '10px', ":hover": { background: '#ffffff1a', borderRadius: '6px' }, padding: '5px' }} alignItems="center">
			<Grid item onClick={handleShowPopup}>
				<img alt="" src={item?.thumbnail}
					style={{ height: '40px', width: '40px', borderRadius: '6px', cursor: 'pointer' }}
					onClick={handleShowPopup}
				/>
			</Grid>
			<Grid xs item container sx={{ marginLeft: '10px', flexDirection: 'column', width: 'fit-content' }}>
				<Grid item>
					<TextLineClamp line={1}
						sx={{
							fontSize: '13px',
							fontWeight: '600',
							color: item.streaming_status === 2 ? '#ffffff80' : '#FFF',
						}}>{item.title}
					</TextLineClamp>
				</Grid>
				<Grid item container sx={{ marginY: '3px' }}>
					{item?.artists.map((items: any, index: number) => {
						return(
							<Grid item key={index}>
								<TextOnline
									sx={{
										fontSize: '12px',
										color: '#ffffff80',
										fontWeight: '500',
										cursor: 'pointer',
										":hover": {
											color: '#c273ed',
											textDecoration: 'underline',
										}
									}}
								>{items.name}&ensp;</TextOnline>
							</Grid>
						);
					})}
				</Grid>
			</Grid>
		</Grid>
	);
}

const ListSongRecommend = () => {
	const { id, setShowListSong } = useContext(WrapperContext);
	const [data, setData] = useState([])

	useEffect(() => {
		if(id){
			getRecommendSong.getAll(id).then(res => {
				setData(res?.data?.data);
			})
		}
	}, [id])

	const toggleCloseListMusic = useCallback(() => {
		setShowListSong(false);
	}, [setShowListSong])

	return(
		<Grid container
			sx={{
				position: 'fixed',
				right: 0,
				top: 0,
				width: '330px',
				height: '91.5%',
				background: '#120822',
				zIndex: 100,
				flexDirection: "column",
				padding: '24px',
			}}>
				<Grid item container justifyContent="space-between" alignItems="center">
					<Grid item>
						<Typography sx={{ fontSize: '18px', fontWeight: 'bold', color: 'white'}}>Danh sách phát</Typography>
					</Grid>
					<Grid item sx={{ cursor: 'pointer' }} onClick={toggleCloseListMusic}>
						<CloseOutlinedIcon />
					</Grid>
				</Grid>
				<Grid item sx={{ marginTop: '25px' }}>
					{ data?.map((item:any, index) => {
						return(
							<SongItem key={index} item={item}/>
						);
					})}
				</Grid>
		</Grid>
	);
}

export default ListSongRecommend;

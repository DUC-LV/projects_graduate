/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
import { WrapperContext } from "@/containers/Layout";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import getRecommendSong from "@/services/getRecommendSong";
import { Grid, Typography } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

type props = {
	item: any
}

const SongItem = ({ item }: props) => {
	const handleShowPopup = useCallback(() => {
	const { setShowPlayMusic, setId } = useContext(WrapperContext);
	const router = useRouter();
	const [like, setLike] = useState(false);
	const [isShow, setIsShow] = useState(false);
		if(item?.streaming_status === 2){
			setIsShow(true)
		} else {
			setShowPlayMusic(true);
			setId(item?.id);
			localStorage.setItem("dataPlayMusic", JSON.stringify({"type": "song", "id": item?.id}))
		}
	}, [item?.id, item?.streaming_status]);
	return(
		<Grid container>

		</Grid>
	);
}

const ListSongRecommend = () => {
	const { id } = useContext(WrapperContext);
	const [data, setData] = useState([])
	useEffect(() => {
		if(id){
			getRecommendSong.getAll(id).then(res => {
				setData(res?.data?.data);
			})
		}
	}, [id])
	return(
		<Grid container
			sx={{
				position: 'fixed',
				right: 0,
				top: 0,
				width: '330px',
				height: '100%',
				background: '#170f23',
				zIndex: 2,
				flexDirection: "column",
				padding: '24px',
			}}>
				<Grid item>
					<Typography sx={{ fontSize: '18px', fontWeight: 'bold', color: 'white'}}>Danh sách phát</Typography>
				</Grid>
				<Grid item>
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

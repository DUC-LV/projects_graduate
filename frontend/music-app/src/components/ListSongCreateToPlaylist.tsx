/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { TextLineClamp, TextOnline } from "./Text";
import { convertDuration } from "@/untils";
import FavoriteIcon from '@mui/icons-material/Favorite';
import axiosInstances from "@/services/axiosInstances";
import { toast } from "react-toastify";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Popup from "./Popup";
import { WrapperContext } from "@/containers/Layout";

type Props = {
	data: Array<object>
	description: string,
}

type props = {
	item: any;
}
export const SongItem = ({ item }: props) => {
	const { setShowPlayMusic, setId, id } = useContext(WrapperContext);
	const router = useRouter();
	const [like, setLike] = useState(false);
	const [isShow, setIsShow] = useState(false);

	useEffect(() => {
		if (item?.follow?.length === 0) {
			setLike(false);
		} else if (item?.follow?.length === 1) {
			setLike(true);
		}
	}, [item?.follow?.length])

	const toggleLike = useCallback(() => {
		setLike(!like);
		axiosInstances.post('update-follow', { song_id: item.id ?? '' }).then(res => {
			toast.success(res?.data?.msg);
		})
	}, [item.id, like])

	const handleShowPopup = useCallback(() => {
		if(item?.streaming_status === 2){
			setIsShow(true)
		} else {
			setShowPlayMusic(true);
			setId(item?.id);
			localStorage.setItem("dataPlayMusic", JSON.stringify({"type": "song", "id": item?.id}))
		}
	}, [item?.id, item?.streaming_status, setId, setShowPlayMusic])

	const removeSong = useCallback(() => {
		if(router?.query?.id){
			axiosInstances.post(`remove-to-playlist/${router?.query?.id}`, { song_id: item.id ?? '' }).then(res => {
				toast.success(res?.data?.msg);
			})
		}
	}, [item.id, router?.query?.id]);

	return(
		<Grid item container alignItems={'center'}
			sx={{
				height: '60px', paddingY: '10px',
				borderBottom: '1px solid hsla(0,0%,100%,0.05)',
				":hover": {
					background: '#ffffff1a',
					borderRadius: '4px'
				},
				background: id === item?.id ? '#ffffff1a' : ''
			}}>
			<Grid xs={6} item container alignItems={'center'}>
				<Grid item>
					<RemoveOutlinedIcon style={{ marginBottom: '8px', color: 'grey', cursor: 'pointer' }} onClick={removeSong}/>
					<img alt="" src={item?.thumbnail}
						style={{ height: '40px', width: '40px', borderRadius: '6px', cursor: 'pointer', marginLeft: '15px' }}
						onClick={handleShowPopup}
					/>
				</Grid>
				<Grid xs item container sx={{ marginLeft: '10px', flexDirection: 'column', width: 'fit-content' }}>
					<Grid item>
						<TextLineClamp line={2}
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
			<Grid item xs={4} sx={{ cursor: 'pointer' }}>
				<TextOnline
					sx={{
						fontSize: '12px',
						color: item.streaming_status === 2 ? '#ffffff80' : '#FFF',
						fontWeight: '500',
						":hover": {
							color: '#c273ed',
							textDecoration: 'underline',
						}
					}}>
					{item.album.title}
				</TextOnline>
			</Grid>
			<Grid item container xs={2} sx={{ alignItems: 'center', justifyContent: 'space-evenly', textAlign: 'center' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
					<FavoriteIcon sx={{ color: like ? '#9b4de0' : 'white' }} onClick={toggleLike}/>
				</Box>
				<TextOnline sx={{fontSize: '12px', color: 'white'}}>
					{convertDuration(item.duration)}
				</TextOnline>
			</Grid>
			<Popup
				isShow={isShow}
				onClose={() => setIsShow(false)}
				title="Dành Cho Tài Khoản VIP"
				message="Theo yêu cầu của đơn vị sở hữu bản quyền, bạn cần tài khoản VIP để nghe bài hát này."
				actions={[
					{ key: 'cancel', title: 'Đóng' },
					{ key: 'ok', title: 'Nâng Cấp VIP' },
				]}
				onAction={ key => {
					if(key === 'ok'){
						router.push('/packages');
					} else if (key === 'cancel'){
						setIsShow(false);
					}
				}}
			/>
		</Grid>
	);
}


const ListSongCreateToPlaylist = ({ data, description }: Props) => {
	const router = useRouter();
	return(
		<Grid container
			sx={{
				flexDirection: 'column',
				"@media screen and (max-width: 1200px)": {
					marginX: '0',
					marginTop: '20px'
				}
			}}>
			<Grid item
				sx={{
					"@media screen and (max-width: 1200px)": {
						display: 'none',
					},
					marginBottom: '10px',
					marginLeft: '25px',
				}}>
				<TextLineClamp
					line={2}
					sx={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>
					{description}
				</TextLineClamp>
			</Grid>
			<Grid item container sx={{ marginLeft: '25px' }}>
				<Grid item xs={6}>
					<TextOnline
						sx={{ fontSize: '14px', fontWeight: '600', color: 'hsla(0,0%,100%,0.5)' }}
					>Bài Hát</TextOnline>
				</Grid>
				<Grid item xs={4}>
					<TextOnline
						sx={{ fontSize: '14px', fontWeight: '600', color: 'hsla(0,0%,100%,0.5)'}}
					>Album</TextOnline>
				</Grid>
				<Grid item xs={2}>
					<TextOnline
						sx={{ fontSize: '14px', fontWeight: '600', color: 'hsla(0,0%,100%,0.5)', textAlign: 'center' }}
					>Thời Gian</TextOnline>
				</Grid>
			</Grid>
			<Grid item container sx={{ flexDirection: 'column', marginLeft: '25px'}}>
				{data?.map((item: any, index) => {
					return(
						<SongItem  key={index} item={item} />
					);
				})}
			</Grid>
		</Grid>
	);
}

export default ListSongCreateToPlaylist;

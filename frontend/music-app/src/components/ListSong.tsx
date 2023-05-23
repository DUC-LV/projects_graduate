/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { TextLineClamp, TextOnline } from "./Text";
import { convertDuration } from "@/untils";
import FavoriteIcon from '@mui/icons-material/Favorite';

type Props = {
	data: Array<object>
	description: string,
}


const ListSong = ({ data, description }: Props) => {
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
						<Grid item container key={index} alignItems={'center'}
							sx={{
								height: '60px', paddingY: '10px',
								borderBottom: '1px solid hsla(0,0%,100%,0.05)',
								":hover": {
									background: '#ffffff1a',
									borderRadius: '4px'
								}
							}}>
							<Grid xs={6} item container alignItems={'center'}>
								<img alt="" src={item?.thumbnail}
									style={{ height: '40px', width: '40px', borderRadius: '6px', cursor: 'pointer' }}
								/>
								<Grid item sx={{ marginLeft: '10px', flexDirection: 'column' }}>
									<TextOnline
										sx={{
											fontSize: '14px',
											fontWeight: '600',
											color: item.streaming_status === 2 ? '#ffffff80' : '#FFF',
										}}>{item.title}
									</TextOnline>
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
										color: 'white',
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
									<FavoriteIcon sx={{ color: 'white' }}/>
								</Box>
								<TextOnline sx={{fontSize: '12px', color: 'white'}}>
									{convertDuration(item.duration)}
								</TextOnline>
							</Grid>
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);
}

export default ListSong;

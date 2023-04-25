/* eslint-disable @next/next/no-img-element */
import { DataPlaylists } from '@/schemas';
import { Grid, Typography, Box } from '@mui/material';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


export const PlaylistSlider = (props: { data: Array<DataPlaylists>, title: string }) => {
	const { data, title } = props;
	return(
		<Box>
			<Grid container>
				<Typography sx={{ fontSize: '1.5rem', fontWeight: '700', color: 'white'}}>{title}</Typography>
			</Grid>
			{/* {data?.map((item, index) => {
				return(
					<Swiper key={index} slidesPerView={5} style={{ width: '100%'}}>
						<SwiperSlide>
							<img alt="" src={item?.thumbnail_m}  key={index} height="250px" width="250px"/>
						</SwiperSlide>
					</Swiper>
				);
			})} */}
			<Swiper slidesPerView={5}>
				{data?.map((item, index) => {
					return(
						<SwiperSlide key={index}>
							<img alt="" src={item?.thumbnail_m}  key={index}/>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</Box>
	);
}

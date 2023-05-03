/* eslint-disable @next/next/no-img-element */
import { DataPodCast, DataPodCastCategory, DataStreaming } from '@/schemas';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TextLineClamp, TextOnline } from '../Text';


export const StreamingSlider = (props: { data: Array<DataStreaming> }) => {
	const { data } = props;
	return(
		<Box>
			<Swiper loop slidesPerView={5}>
				{data?.map((item, index) => {
					return(
						<SwiperSlide key={index} style={{  cursor: "pointer" }}>
							<Grid container
								sx={{
									position: 'relative',
									flexDirection: 'column',
									justifyContent: 'Center',
									alignItems: 'center',
									maxWidth: 'fit-content',
								}}>
								<Grid container item>
									<img
										alt=''
										src={item?.thumbnail_m}
										style={{ borderRadius: '99%', border: '3px solid red' }}
									/>
								</Grid>
								<Grid container item>
									<TextOnline sx={{ fontSize: '16px', fontWeight: 600, color: 'white', margin: '10px auto'}}>
										{item?.title}
									</TextOnline>
								</Grid>
							</Grid>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</Box>
	);
}


export const PodCastCategorySlider = (props: { data: Array<DataPodCastCategory>, title: string }) => {
	const { data, title } = props;
	return(
		<Box sx={{ marginY: '30px' }}>
			<Grid container>
				<Typography sx={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginY: '10px'}}>{title}</Typography>
			</Grid>
			<Swiper
				loop
				slidesPerView={5}
			>
				{data?.map((item, index) => {
					return(
						<SwiperSlide key={index} style={{  cursor: "pointer" }}>
							<Grid container item direction="column"
								sx={{
									backgroundColor: '#181818',
									padding: '16px',
									borderRadius: '6px',
									":hover": {
										backgroundColor: '#282828'
									}
								}}
							>
								<Grid container item sx={{ marginBottom: '16px' }}>
									<img
										alt=""
										src={item?.thumbnail} height="100%" width="100%"
										style={{ borderRadius: '6px', maxWidth: 'min-content' }}
									/>
								</Grid>
							</Grid>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</Box>
	);
}

export const PodCastSlider = (props: { data: Array<DataPodCast>, title: string }) => {
	const { data, title } = props;
	return(
		<Box sx={{ marginBottom: '30px' }}>
			<Grid container>
				<Typography sx={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginY: '10px'}}>{title}</Typography>
			</Grid>
			<Swiper
				loop
				slidesPerView={5}
			>
				{data?.map((item, index) => {
					return(
						<SwiperSlide key={index} style={{  cursor: "pointer" }}>
							<Grid container item direction="column"
								sx={{
									backgroundColor: '#181818',
									padding: '16px',
									borderRadius: '6px',
									":hover": {
										backgroundColor: '#282828'
									}
								}}
							>
								<Grid container item sx={{ marginBottom: '16px' }}>
									<img
										alt=""
										src={item?.thumbnail_m} height="100%" width="100%"
										style={{ borderRadius: '6px', maxWidth: 'min-content' }}
									/>
								</Grid>
								<Grid container item flexDirection="column">
									<TextLineClamp line={1} sx={{ fontSize: '16px', fontWeight: '700', color: 'white', mb: '8px'}}>
										{item?.title}
									</TextLineClamp>
								</Grid>
							</Grid>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</Box>
	);
}

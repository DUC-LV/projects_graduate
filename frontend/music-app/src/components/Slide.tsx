/* eslint-disable @next/next/no-img-element */
import { DataPlaylists } from '@/schemas'
import { Grid, Typography, Box } from '@mui/material'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import {TextLineClamp, TextOnline} from "@/components/Text";

export const PlaylistSlider = (props: { data: Array<DataPlaylists>, title: string }) => {
	const { data, title } = props
	return (
		<Box sx={{ marginBottom: '30px' }}>
			<Grid container>
				<Typography sx={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginX: '8px', }}>{title}</Typography>
			</Grid>
			<Swiper
				loop
				slidesPerView={5}
			>
				{data?.map((item, index) => {
					return(
						<SwiperSlide key={index} style={{  cursor: "pointer", padding: '8px' }}>
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
										key={index}
										alt=""
										src={item?.thumbnail_m} height="100%" width="100%" style={{ borderRadius: '6px' }}
									/>
								</Grid>
								<Grid container item flexDirection="column">
									<TextOnline sx={{ fontSize: '16px', fontWeight: '700', color: 'white', mb: '8px'}}>
										{item?.title}
									</TextOnline>
									<TextLineClamp line={2} sx={{ fontSize: '14px', fontWeight: 500, color: '#a7a7a7'}}>
										{item?.sort_description}
									</TextLineClamp>
								</Grid>
							</Grid>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</Box>
	)
}

export const AlbumSlider = (props: { data: Array<DataPlaylists>; title: string }) => {
	const { data, title } = props;
	return(
		<Box sx={{ marginBottom: '30px' }}>
			<Grid container>
				<Typography sx={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginX: '8px', }}>{title}</Typography>
			</Grid>
			<Swiper
				loop
				slidesPerView={5}
			>
				{data?.map((item, index) => {
					return(
						<SwiperSlide key={index} style={{  cursor: "pointer", padding: '8px' }}>
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
										key={index}
										alt=""
										src={item?.thumbnail} height="100%" width="100%" style={{ borderRadius: '6px' }}
									/>
								</Grid>
								<Grid container item flexDirection="column">
									<TextLineClamp line={1} sx={{ fontSize: '16px', fontWeight: '700', color: 'white', mb: '8px'}}>
										{item?.title}
									</TextLineClamp>
									<TextLineClamp line={1} sx={{ fontSize: '14px', fontWeight: 500, color: '#a7a7a7'}}>
										{item?.artist_names}
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


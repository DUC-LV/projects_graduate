/* eslint-disable @next/next/no-img-element */
import { DataPodCast, DataPodCastCategory, DataStreaming } from '@/schemas';
import { Box, Grid, Typography } from '@mui/material';
import React, { useCallback, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TextLineClamp, TextOnline } from '../Text';
import { useRouter } from 'next/router';
import { convertSlug } from '@/untils';
import { WrapperContext } from '@/containers/Layout';

const IteamStreaming = (props: { item: any }) => {
	const { item } = props;
	const { setShowStreaming, setIdStreaming } = useContext(WrapperContext);

	const toggleStreaming = useCallback(() => {
		setShowStreaming(true);
		localStorage.setItem("idStreaming", item.id)
		setIdStreaming(item?.id)
	}, [item.id, setIdStreaming, setShowStreaming])

	return(
		<Grid container
			onClick={toggleStreaming}
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
	);
}


export const StreamingSlider = (props: { data: Array<DataStreaming> }) => {
	const { data } = props;
	return(
		<Box>
			<Swiper loop slidesPerView={4}>
				{data?.map((item, index) => {
					return(
						<SwiperSlide key={index} style={{  cursor: "pointer" }}>
							<IteamStreaming item={item}/>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</Box>
	);
}


export const PodCastCategorySlider = (props: { data: Array<DataPodCastCategory>, title: string }) => {
	const { data, title } = props;
	const router = useRouter();
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
								onClick={() => {
									router.push({
										pathname: '/podcast-category/[slugPodcastCategory]',
										query: {
											slugPodcastCategory: convertSlug(item?.title ? item?.title : ''),
											id: item?.id
										}
									})
								}}
								sx={{
									backgroundColor: '#181818',
									padding: '16px',
									borderRadius: '6px',
									":hover": {
										backgroundColor: '#282828'
									}
								}}
							>
								<Grid container item>
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
	const router = useRouter();
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
								onClick={() => {
									router.push({
										pathname: '/podcast/[slugPodcast]',
										query: {
											slugPodcast: convertSlug(item?.title ? item?.title : ''),
											id: item?.id
										}
									})
								}}
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
										style={{ borderRadius: '6px' }}
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

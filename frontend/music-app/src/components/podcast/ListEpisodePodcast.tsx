/* eslint-disable @next/next/no-img-element */
import { DataPocastEpiside } from "@/schemas";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { TextLineClamp } from "../Text";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { convertDuration, getFullTimeFromDatetime } from "@/untils";

type Props = {
	dataPocastEpiside?: Array<DataPocastEpiside>| any;
}

const ListEpisodePodcast = ({ dataPocastEpiside }: Props) => {
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
				{dataPocastEpiside?.map((item: DataPocastEpiside, index: number) => {
					return(
						<Grid item container key={index} sx={{ marginBottom: '24px', alignItems: 'center' }}>
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
									<PlayCircleIcon style={{ color: 'white', height: '30px', width: '30px', cursor: 'pointer' }}/>
									<Typography
										sx={{ fontSize: '13px', fontWeight: 500, color: 'hsla(0,0%,100%,0.5)'}}>
										{getFullTimeFromDatetime(Number(item?.release_date))}
									</Typography>
									<Typography
										sx={{ fontSize: '13px', fontWeight: 500, color: 'hsla(0,0%,100%,0.5)'}}>
										{convertDuration(Number(item?.duration))}
									</Typography>
									<Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
										<FavoriteIcon sx={{ color: 'white' }}/>
									</Box>
								</Box>
							</Grid>
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);
}

export default ListEpisodePodcast;

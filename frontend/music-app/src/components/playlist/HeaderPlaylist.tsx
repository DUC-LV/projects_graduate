/* eslint-disable @next/next/no-img-element */
import { DataHeaderPlaylist } from "@/schemas";
import { Box, Grid } from "@mui/material";
import React from "react";
import { TextLineClamp, TextOnline } from "../Text";
import FavoriteIcon from '@mui/icons-material/Favorite';

const HeaderPlaylist = ({ thumbnail_m, title, artist_names, sort_description }: DataHeaderPlaylist) => {
	return(
		<Grid container
			sx={{
				"@media screen and (min-width: 1201px)":{
					flexDirection: 'column',
					width: '300px',
				},
				"@media screen and (max-width: 1200px)": {
					flexWrap: 'nowrap'
				}
			}}
		>
			<Grid item>
				<img alt="" src={thumbnail_m} className="thumail_m-playlist-detail"/>
			</Grid>
			<Grid item container
				sx={{
					"@media screen and (max-width: 1200px)":{
						flexDirection: 'column',
						marginLeft: '25px'
					},
					"@media screen and (min-width: 1200px)":{
						justifyContent: 'center',
						marginTop: '12px',
						flexDirection: 'column',
					}
				}}
			>
				<Grid item
					sx={{
						flexDirection: 'column',
						width: '100%',
						height: '100%',
						"@media screen and (min-width: 1200px)":{
							textAlign: 'center'
						}
					}}
				>
					<TextLineClamp
						line={2}
						sx={{
							fontSize: '20px',
							fontWeight: '700',
							color: 'white',
							lineHeight: '30px',
						}}
					>{title}</TextLineClamp>
					<TextOnline
						sx={{
							fontSize: '12px',
							color: '#ffffff80',
							fontWeight: '600',
							lineHeight: '21px',
						}}>
						{artist_names}
					</TextOnline>
					<TextLineClamp
						line={2}
						sx={{
							fontSize: '14px',
							fontWeight: '600',
							color: '#ffffff80',
							lineHeight: '21px',
							"@media screen and (min-width: 1200px)": {
								display: 'none',
							}
						}}
					>{sort_description}</TextLineClamp>
					<Box
						sx={{
							display: 'flex',
							height: '35px',
							width: '35px',
							borderRadius: '99%',
							background: 'hsla(0,0%,100%,0.1)',
							justifyContent: 'center',
							alignItems: 'center',
							margin: '10px auto',
							cursor: 'pointer'
						}}>
						<FavoriteIcon sx={{ color: 'white' }}/>
					</Box>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default HeaderPlaylist;

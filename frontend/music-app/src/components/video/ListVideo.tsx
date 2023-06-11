/* eslint-disable @next/next/no-img-element */
import { DataVideo } from "@/schemas";
import { Grid } from "@mui/material";
import React from "react";
import { TextLineClamp, TextOnline } from "../Text";
import { convertDuration } from "@/untils";
import { useRouter } from "next/router";


const ListVideo = (props: { data: Array<DataVideo> }) => {
	const router = useRouter();
	const { data } = props;
	return(
		<Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ marginTop: '20px' }}>
			{data?.map((item, index) => {
				return(
					<Grid key={index} item container md={3} flexDirection="column" sx={{ position: 'relative' }}>
						<Grid item xs sx={{ cursor: 'pointer' }}>
							<img alt="" src={item?.thumbnail_m} style={{ height: '100%', width: '100%', borderRadius: '6px' }}/>
						</Grid>
						<Grid item container sx={{ marginY: '10px' }}>
							<Grid item>
								<img alt="" src={item.artist?.thumbnail} style={{ height: '35px', width: '35px', borderRadius: '999px' }}/>
							</Grid>
							<Grid item flexDirection="column" sx={{ marginLeft: '10px', width: '80%' }}>
								<TextLineClamp
									line={1}
									sx={{
										color: '#f3f3f4',
										fontWeight: '600',
										fontSize: '14px',
										cursor: 'pointer',
										":hover": {
											color: '#c273ed',
										}
									}}>{item.title}
								</TextLineClamp>
								<TextOnline
									onClick={() => {
									}}
									sx={{
										color: 'rgba(255, 255, 255, 0.5)',
										fontWeight: '400',
										fontSize: '13px',
										cursor: 'pointer',
										":hover": {
											color: '#c273ed',
											textDecoration: 'underline'
										}
									}}
								>{item.artist?.name}</TextOnline>
							</Grid>
						</Grid>
						<Grid item
							sx={{
								position: 'absolute',
								right: '5px',
								bottom: '66px',
								background: '#000000b3',
								borderRadius: '4px',
								justifyContent: 'center',
								alignItems: 'center',
								width: '40px',
							}}>
							<TextOnline
								sx={{ color: 'white', fontSize: '12px', textAlign: 'center', margin: 'auto 0' }}>
								{convertDuration(item.duration ? item.duration : 0)}
							</TextOnline>
						</Grid>
					</Grid>
				);
			})}
		</Grid>
	);
}

export default ListVideo;

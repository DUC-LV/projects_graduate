/* eslint-disable @next/next/no-img-element */
import { DataPlaylists } from "@/schemas";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { TextLineClamp } from "./Text";
import { useRouter } from "next/router";
import { convertSlug } from "@/untils";

const PlaylistCreateByUser = (props: { data: Array<DataPlaylists>, title: string }) => {
	const { data, title } = props;
	const router = useRouter();
	return(
		<>
			<Typography
				component={'div'}
				sx={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginY: '15px' }}>
				{title}
			</Typography>
			<Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
				{data?.map((item, index) => {
					return(
						<Grid
							key={index}
							item container md={2}
							flexDirection="column"
							onClick={() => {
								router.push({
									pathname:'/my-playlist/[slugMyPlaylist]',
									query: {
										slugMyPlaylist: convertSlug(String(item.title)),
										id: item?.id,
									}
								})
							}}>
							<Grid item xs sx={{ cursor: 'pointer' }}>
								<img alt="" src={item?.thumbnail} style={{ height: '100%', width: '100%', borderRadius: '6px' }}/>
							</Grid>
							<Grid item sx={{ marginY: '8px' }}>
								<TextLineClamp
									sx={{ fontSize: '15px', fontWeight: '600', color: 'white', textTransform: 'none'}}
									line={1}>
									{item?.title}
								</TextLineClamp>
							</Grid>
						</Grid>
					);
				})}
			</Grid>
		</>
	)
}

export default PlaylistCreateByUser;

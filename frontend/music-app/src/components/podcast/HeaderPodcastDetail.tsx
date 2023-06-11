/* eslint-disable @next/next/no-img-element */
import { DataPodCast } from "@/schemas";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { TextLineClamp } from "../Text";

type Props = {
	dataPodcast?: DataPodCast | any;
}


const HeaderPodcastDetail = ({ dataPodcast }: Props) => {
	return(
		<Grid container spacing={2}>
			<Grid item>
				<img alt="" src={dataPodcast?.thumbnail} style={{ height: '240px', width: '240px', borderRadius: '12px' }}/>
			</Grid>
			<Grid item xs sx={{ marginLeft: '30px' }} flexDirection="column">
				<TextLineClamp line={2}
					sx={{ fontSize: '40px', fontWeight: 700, color: 'white', fontFamily: 'Inter,sans-serif'}}>
					{dataPodcast?.title}
				</TextLineClamp>
				<TextLineClamp line={2}
					sx={{ fontSize: '15px', color: 'white', marginY: '10px', fontFamily: 'Inter,sans-serif', fontWeight: 700 }}
				>{dataPodcast?.description}</TextLineClamp>
				<Typography component={'div'}
					sx={{ fontSize: '14px', color: 'white', fontFamily: 'Inter,sans-serif' }}>
					Thể loại: {dataPodcast?.type}
				</Typography>
			</Grid>
		</Grid>
	);
}

export default HeaderPodcastDetail;

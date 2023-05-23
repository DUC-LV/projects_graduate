/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Grid } from "@mui/material";
import { DataPodCast } from "@/schemas";
import { TextLineClamp } from "../Text";

interface DataListPodCast {
	data: Array<DataPodCast>
}

const ListPodcast = ({ data }: DataListPodCast) => {
	return(
		<Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
			{data?.map((item, index) => {
				return(
					<Grid key={index} item container md={2} flexDirection="column">
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
	);
}

export default ListPodcast;

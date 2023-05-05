/* eslint-disable @next/next/no-img-element */
import { DataBannerHub } from "@/schemas";
import { Grid } from "@mui/material";
import React from "react";


const BannerHub = (props: { data: DataBannerHub }) => {

	const { data } = props;
	return(
		<Grid container>
			<img src={data?.cover} alt="" style={{ width: '100%', borderRadius: '8px' }}/>
		</Grid>
	);
}

export default BannerHub;

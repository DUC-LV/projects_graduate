/* eslint-disable @next/next/no-img-element */
import { DataPackages } from "@/schemas";
import { Grid } from "@mui/material";
import React from "react";
import { TextLineClamp, TextOnline } from "../Text";

const PackageItem = ({ data }: { data: DataPackages }) => {
	return(
		<Grid container xs sx={{ position: 'relative' }}>
			<img alt=""
				src={data?.thumbnail}
				style={{
					height: '140px',
					width: '360px',
					borderRadius: '6px'
				}}
			/>
			<TextOnline
				sx={{
					position: 'absolute',
					top: '28px',
					left: '16px',
					fontSize: '20px',
					textTransform: 'uppercase',
					color: 'white',
					fontWeight: 600
				}}>
				{data?.package_name}
			</TextOnline>
			<TextLineClamp line={2}
				sx={{
					position: 'absolute',
					top: '40px',
					right: '32px',
					fontSize: '22px',
					fontWeight: 'bold'
				}}
			>
				{data?.price} VND
			</TextLineClamp>
			<Grid item
				sx={{
					position: 'absolute',
					width: '90px',
					height: '25px',
					background: '#F2AF12',
					bottom: '4px', right: '14px',
					borderRadius: '16px 0 4px 0',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<TextOnline
					sx={{ fontSize: '14px', fontWeight: 600, color: 'white', textAlign: 'center', margin: 'auto 0' }}>
					Mua Ngay
				</TextOnline>
			</Grid>
		</Grid>
	);
}

export default PackageItem;

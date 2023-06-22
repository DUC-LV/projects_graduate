/* eslint-disable @next/next/no-img-element */
import { TextLineClamp } from "@/components/Text";
import PackageItem from "@/components/packages/PackageItem";
import { DataPackages } from "@/schemas";
import getPackages from "@/services/getPackages";
import { textIntroduce, textNamePackage } from "@/untils";
import { Grid } from "@mui/material";
import React from "react";

type Props = {
	data: Array<DataPackages>
}

export async function getServerSideProps() {
	try {
		const res = await getPackages.getAll();
		return {
			props: {
				data: res.data.data,
			}
		};
	} catch (error) {
		return {
			redirect: {
				destination: '/',
				statusCode: 307
			}
		}
	}
}

const Packages = ({ data }: Props) => {
	return(
		<Grid container flexDirection="column">
			<Grid item container flexDirection="column" sx={{ marginBottom: '50px' }} justifyContent="center" alignItems="center">
				<Grid item>
					<img
						alt=""
						src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
						style={{
							height: '40px',
						}}
					/>
				</Grid>
				<Grid item sx={{ marginBottom: '15px' }}>
					<TextLineClamp
						sx={{ fontSize: '40px', fontWeight: 900, color: 'white' }}
						line={1}>{textNamePackage}
					</TextLineClamp>
				</Grid>
				<Grid item>
					<TextLineClamp line={1} sx={{ fontSize: '1.2rem', fontWeight: 600, color: 'white'}}>
						{textIntroduce}
					</TextLineClamp>
				</Grid>
			</Grid>
			<Grid item container>
				{data?.map((item, index) => {
					return(
						<PackageItem key={index} data={item}/>
					);
				})}
			</Grid>
		</Grid>
	);
}

export default Packages;

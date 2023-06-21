import { DataPackages } from "@/schemas";
import getPackages from "@/services/getPackages";
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
		<Grid></Grid>
	);
}

export default Packages;

import getHomePage from "@/services/getHomePage";
import { Box } from "@mui/material";
import React from "react";

type Props = {
	data: Array<object>
}
export async function getServerSideProps() {
	try {
		const res = await getHomePage.getAll();
		return {
			props: {
				data: res.data.data.items,
			}
		};
	} catch (error) {
		console.log(error)
	}
}

const HomePage = ({ data }: Props) => {
	console.log(data);
	return(
		<Box>

		</Box>
	);
}

export default HomePage;

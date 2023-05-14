import getTopicDetail from "@/services/getTopicDetail";
import { Grid } from "@mui/material";
import React from "react";

type Props = {
	data: any,
}

export async function getServerSideProps({ query }: any) {
	try {
		if(query?.id){
			const res = await getTopicDetail.getAll(query.id);
			return {
				props: {
					data: res.data.data,
				}
			};
		}

	} catch (error) {
		console.log(error)
	}
}

const TopicDetail = ({ data }: Props) => {
	console.log(data);
	return(
		<Grid></Grid>
	);
}

export default TopicDetail;

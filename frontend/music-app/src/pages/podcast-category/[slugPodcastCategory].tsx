import ListPodcast from "@/components/podcast/ListPodcast";
import getPodcastCategoryDetail from "@/services/getPodcastCategoryDetail";
import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {
	data: any
}

export async function getServerSideProps({ query }: any) {
	try {
		if(query?.id){
			const res = await getPodcastCategoryDetail.getAll(query?.id);
			return {
				props: {
					data: res.data.data,
				}
			};
		}
	} catch (error) {
		return {
			redirect: {
				destination: '/',
				statusCode: 307
			}
		}
	}
}
const PodcastCategory = ({ data }: Props) => {
	return(
		<Box>
			<Box sx={{ margin: '20px auto' }}>
				<Typography component={'div'} sx={{ fontSize: '48px', fontWeight: 700, color: 'white', textAlign: 'center' }}>
					{data?.title}
				</Typography>
			</Box>
			<Box>
				<ListPodcast data={data?.items}/>
			</Box>
		</Box>
	);
}

export default PodcastCategory;

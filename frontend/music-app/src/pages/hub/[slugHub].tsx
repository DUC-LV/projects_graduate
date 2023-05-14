/* eslint-disable @next/next/no-img-element */
import { PlaylistSlider } from "@/components/home/Slide";
import getTopicDetail from "@/services/getTopicDetail";
import { Box } from "@mui/material";
import React, { useCallback } from "react";

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

	const SectionType = {
		playlist: "playlist",
	}

	const generateContent = useCallback(() => {
		return data?.sections?.map((section: any, index: number) => {

			if(!section?.items || section?.items.length === 0){
				return null;
			}

			switch(section?.sectionType){

				case SectionType?.playlist:
					return(
						<PlaylistSlider
							key={index}
							data={section?.items}
							title={section?.title}
						/>
					);

				default:
					return null;
			}
		})
	}, [SectionType?.playlist, data?.sections])

	return(
		<Box>
			<img alt="" src={data?.cover} style={{ height: '100%', width: '100%', borderRadius: '6px' }}/>
			<Box sx={{ marginTop: '30px' }}>
				{generateContent()}
			</Box>
		</Box>
	);
}

export default TopicDetail;

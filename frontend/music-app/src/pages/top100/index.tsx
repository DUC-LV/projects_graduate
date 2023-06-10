/* eslint-disable @next/next/no-img-element */
import { PlaylistSlider } from "@/components/home/Slide";
import { DataPlaylists } from "@/schemas";
import getTop100Page from "@/services/getTop100Page";
import { urlImageTop100 } from "@/untils";
import { Box } from "@mui/material";
import React, { useCallback } from "react";

type Props = {
	data: Array<DataPlaylists>
}
export async function getServerSideProps() {
	try {
		const res = await getTop100Page.getAll();
		return {
			props: {
				data: res.data.data.items,
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

const Top100Page = ({ data }: Props) => {

	const SectionType = {
		playlist: "playlist",
	}

	const generateContent = useCallback(() => {
		return data?.map((section: any, index: number) => {

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
	}, [SectionType?.playlist, data])

	return(
		<Box>
			<img alt="" src={urlImageTop100} style={{ width: '100%', height: '350px' }}/>
			{generateContent()}
		</Box>
	);
}

export default Top100Page;

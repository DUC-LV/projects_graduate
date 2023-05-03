import {AlbumSlider, PlaylistSlider} from "@/components/home/Slide";
import { DataPlaylists } from "@/schemas";
import getHomePage from "@/services/getHomePage";
import { Box } from "@mui/material";
import React, { useCallback } from "react";

type Props = {
	data: Array<DataPlaylists>
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

	const SectionType = {
		playlist: "playlist",
		album: "album",
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

				case SectionType?.album:
					return(
						<AlbumSlider
							key={index}
							data={section?.items}
							title={section?.title}
						/>
					);

				default:
					return null;
			}

		})
	}, [SectionType?.album, SectionType?.playlist, data])

	return(
		<Box>
			{generateContent()}
		</Box>
	);
}

export default HomePage;

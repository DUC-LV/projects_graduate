import React, { useCallback } from "react";
import { Box, Grid } from "@mui/material";
import getSearch from "@/services/getSearch";
import { AlbumSlider, PlaylistSlider } from "@/components/home/Slide";
import ListSong from "@/components/ListSong";
import { TextOnline } from "@/components/Text";

type Props = {
	data: any,
}

export async function getServerSideProps({ query }: any) {
	try {
		if(query?.q){
			const res = await getSearch.getAll(query.q);
			return {
				props: {
					data: res.data.data.items,
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

const SearchPage = ({ data }: Props) => {

	const SectionType = {
		playlist: "playlist",
		song: "song",
		album: "album",
		video: "video",
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

				case SectionType?.song:
					return(
						<Box key={index}>
							<TextOnline
								sx={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginX: '8px', }}
							>{section?.title}</TextOnline>
							<ListSong
								data={section?.items}
								description=""
							/>
						</Box>
					);
				default:
					return null;
			}

		})
	}, [SectionType?.album, SectionType?.playlist, SectionType?.song, data])

	return(
		<Grid sx={{ overflow: 'hidden' }}>
			{generateContent()}
		</Grid>
	);
}

export default SearchPage;

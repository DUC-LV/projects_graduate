import { Box, Typography } from "@mui/material";
import React, { useCallback } from "react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import ListPlaylist from "@/components/playlist/ListPlaylist";
import ListSong from "@/components/ListSong";
import ListEpisodePodcast from "@/components/podcast/ListEpisodePodcast";

type Props = {
	data: Array<object>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

	const config : object = {
		headers: {
			'Authorization': 'Bearer ' + context.req.cookies.access_token,
			'Content-Type': 'application/json',
			'accept': 'application/json',
		},
		proxy: false
	}
	try {
		const res = await axios.get('http://localhost:8000/favourite', config);

		return {
			props: {
				data: res.data.data.items
			}
		};

	} catch (error) {
		console.log(error)
	}
}


const MyMusicPage = ({ data }: Props) => {

	const SectionType = {
		playlist: "playlist",
		song: "song",
		PodcastEpisode: "PodcastEpisode"
	};

	const generateContent = useCallback(() => {
		return data?.map((section: any, index: number) => {

			if(!section?.items || section?.items.length === 0){
				return null;
			}

			switch(section?.sectionType){
				case SectionType?.playlist:
					return(
						<ListPlaylist key={index} data={section?.items} title={section.title}/>
					);

				case SectionType?.song:
					return(
						<Box sx={{ overflow: 'hidden' }} key={index}>
							<Typography sx={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginY: '15px' }}>Bài Hát</Typography>
							<ListSong data={section?.items} description=""/>
						</Box>
					)

				case SectionType?.PodcastEpisode:
					return(
						<Box key={index} sx={{ marginTop: '30px' }}>
							<ListEpisodePodcast dataPocastEpisode={section?.items} />
						</Box>
					)

				default:
					return null;
			}
		})
	}, [SectionType?.PodcastEpisode, SectionType?.playlist, SectionType?.song, data]);

	return(
		<Box>
			<Typography sx={{ fontSize: '40px', fontWeight: 700, color: 'white', marginBottom: '20px' }}>Thư Viện</Typography>
			{generateContent()}
		</Box>
	);
}

export default MyMusicPage;

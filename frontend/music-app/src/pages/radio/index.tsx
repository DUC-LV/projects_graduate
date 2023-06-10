import { PodCastCategorySlider, PodCastSlider, StreamingSlider } from "@/components/radio/Slide";
import getRadioPage from "@/services/getRadioPage";
import { Box } from "@mui/material";
import React, { useCallback } from "react";


type Props = {
	data: Array<object>
}
export async function getServerSideProps() {
	try {
		const res = await getRadioPage.getAll();
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

const RadioPage = ({ data }: Props) => {

	const SectionType = {
		livestream: "livestream",
		podcast_category: "podcast_category",
		podcastH: "podcastH"
	};

	const generateContent = useCallback(() => {
		return data?.map((section: any, index: number) => {

			if(!section?.items || section?.items.length === 0){
				return null;
			}

			switch(section?.sectionType){
				case SectionType?.livestream:
					return(
						<StreamingSlider
							key={index}
							data={section?.items}
						/>
					);

				case SectionType?.podcast_category:
					return(
						<PodCastCategorySlider
							key={index}
							data={section?.items}
							title={section?.title}
						/>
					);

				case SectionType?.podcastH:
					return(
						<PodCastSlider
							key={index}
							data={section?.items}
							title={section?.title}
						/>
					);

				default:
					return null;
			}
		})
	}, [SectionType?.livestream, SectionType?.podcastH, SectionType?.podcast_category, data])

	return(
		<Box>
			{generateContent()}
		</Box>
	);
}

export default RadioPage;

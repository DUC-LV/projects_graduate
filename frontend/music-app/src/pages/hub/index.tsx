import BannerHub from "@/components/hub/Banner";
import ListTopic from "@/components/hub/ListTopic";
import getHubPage from "@/services/getHubPage";
import { Box } from "@mui/material";
import React, { useCallback } from "react";

type Props = {
	data: Array<object>
}
export async function getServerSideProps() {
	try {
		const res = await getHubPage.getAll();
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

const HubPage = ({ data }: Props) => {

	const SectionType = {
		banner: "banner",
		highlight: "highlight",
		nation: "nation",
		popular: "popular"
	};

	const generateContent = useCallback(() => {
		return data?.map((section: any, index: number) => {

			if(!section?.items || section?.items.length === 0){
				return null;
			}

			switch(section?.sectionType){
				case SectionType.banner:
					return(
						<BannerHub
							key={index}
							data={section?.items}
						/>
					);

				case SectionType.highlight:
					return(
						<ListTopic
							key={index}
							title={section?.title}
							data={section?.items}
						/>
					);

				case SectionType.nation:
					return(
						<ListTopic
							key={index}
							title={section?.title}
							data={section?.items}
						/>
					);

				case SectionType.popular:
					return(
						<ListTopic
							key={index}
							title={section?.title}
							data={section?.items}
						/>
					);

				default:
					return null;
			}
		})
	}, [SectionType.banner, SectionType.highlight, SectionType.nation, SectionType.popular, data]);
	return(
		<Box>
			{generateContent()}
		</Box>
	);
}

export default HubPage;

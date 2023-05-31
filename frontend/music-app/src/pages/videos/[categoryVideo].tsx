import ListVideo from "@/components/video/ListVideo";
import MenuVideo from "@/components/video/MenuVideo";
import getCategoryVideo from "@/services/getCategoryVideo";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
	data: Array<object>
}
export async function getServerSideProps({ query }: any) {
	try {
		if(query?.id){
			const res = await getCategoryVideo.getAll(query.id);
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


const VideoCategoriesPage = ({ data }: Props) => {

	const router = useRouter();

	const [id, setId] = useState(router?.query?.id ? router.query.id : 1);

	const pushRoute = useCallback(
		(id: number) => {
			router.push(`videos/${id}?id=${id}`);
		},
		[router]
	);

	const selectTab = async (id: number) => {
		pushRoute(id);
		setId(id);
	};

	useEffect(() => {
		if (!/videos/.test(router.asPath)) {
			return;
		}
		if(!router.query.id){
			router.replace(
				`videos/[categoryVideo]?id=${id}`,
				`videos/${id}?id=${id}`,
				{ shallow: true}
			)
		}
		else {
			setId(Number(router.query.id))
		}
	}, [id, router]);

	const type = {
		tab: "TAB",
		list: "LIST"
	};

	const generateContent = useCallback(() => {
		return data?.map((section:any, idx:number) => {

			if(!section.items || section.items.length === 0){
				return null
			}
			switch(section.type) {
				case type?.tab:
					return(
						<MenuVideo
							key={idx}
							data={section?.items}
						/>
					)

				case type?.list:
					return (
						<ListVideo
							key={idx}
							data={section?.items}
						/>
					)

				default:
					return null;
			}
		})
	}, [data, type?.list, type?.tab])
	return(
		<Box>
			{generateContent()}
		</Box>
	);
}

export default VideoCategoriesPage;

/* eslint-disable @next/next/no-img-element */
import { DataTopicHub } from "@/schemas";
import { convertSlug } from "@/untils";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const ListTopic = (props: { data: Array<DataTopicHub>, title: string }) => {

	const { data, title } = props;
	const router = useRouter();
	return(
		<Grid container sx={{ marginTop: '30px' }}>
			<Typography component={'div'} sx={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '20px' }}>{title}</Typography>
			<Grid item container spacing={{ xs: 2, md: 3 }}>
				{data?.map((item, index) => {
					return(
						<Grid item key={index} md={3} sx={{ cursor: 'pointer' }}
							onClick={() => {
								router.push({
									pathname: '/hub/[slugHub]',
									query: {
										slugHub: convertSlug(item?.title ? item.title : ''),
										id: item?.id
									}
								})
							}}
						>
							<img className="imgTopic" alt="" src={item?.thumbnail_has_text}/>
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);
};

export default ListTopic;

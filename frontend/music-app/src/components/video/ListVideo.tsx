/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { DataVideo } from "@/schemas";
import { Grid } from "@mui/material";
import React, { useCallback, useContext } from "react";
import { TextLineClamp, TextOnline } from "../Text";
import { useRouter } from "next/router";
import { WrapperContext } from "@/containers/Layout";


const ListVideo = (props: { data: Array<DataVideo> }) => {
	const router = useRouter();
	const { data } = props;

	return(
		<Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ marginTop: '20px' }}>
			{data?.map((item, index) => {
				return(
					<Grid item container flexDirection="column" md={3} key={index} sx={{ position: 'relative' }}>
						<ItemVideo item={item}/>
					</Grid>
				);
			})}
		</Grid>
	);
}

export default ListVideo;


const ItemVideo = ({ item }: { item: any }) => {
	const { setShowPlayVideo, setIdVideo } = useContext(WrapperContext);

	const toggleVideo = useCallback(() => {
		setShowPlayVideo(true);
		setIdVideo(item?.id);
	}, [item?.id, setIdVideo, setShowPlayVideo])

	return(
		<>
			<Grid item xs sx={{ cursor: 'pointer' }}>
				<img alt="" src={item?.thumbnail} style={{ height: '100%', width: '100%', borderRadius: '6px' }} onClick={toggleVideo}/>
			</Grid>
			<Grid item container sx={{ marginY: '10px' }}>
				<Grid item flexDirection="column" sx={{ width: '80%' }}>
					<TextLineClamp
						line={1}
						sx={{
							color: '#f3f3f4',
							fontWeight: '600',
							fontSize: '14px',
							cursor: 'pointer',
							":hover": {
								color: '#c273ed',
							},
							marginBottom: '5px'
						}}>{item.title}
					</TextLineClamp>
					<TextOnline
						onClick={() => {
						} }
						sx={{
							color: 'rgba(255, 255, 255, 0.5)',
							fontWeight: '400',
							fontSize: '13px',
							cursor: 'pointer',
							":hover": {
								color: '#c273ed',
								textDecoration: 'underline'
							}
						}}
					>{item.artist?.name}</TextOnline>
				</Grid>
			</Grid><Grid item
				sx={{
					position: 'absolute',
					right: '5px',
					bottom: '66px',
					background: '#000000b3',
					borderRadius: '4px',
					justifyContent: 'center',
					alignItems: 'center',
					width: '40px',
				}}>
				<TextOnline
					sx={{ color: 'white', fontSize: '12px', textAlign: 'center', margin: 'auto 0' }}>
					{item?.duration}
				</TextOnline>
			</Grid>
		</>
	);
}

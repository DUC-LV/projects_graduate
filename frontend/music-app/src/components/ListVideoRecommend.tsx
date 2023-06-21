/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { DataVideo } from "@/schemas";
import { Grid } from "@mui/material";
import React, { useCallback, useContext } from "react";
import { TextLineClamp, TextOnline } from "./Text";
import { WrapperContext } from "@/containers/Layout";

const ListVideoRecommend = ({ data }: { data: Array<DataVideo> }) => {
	const { setIdVideo, setShowPlayVideo } = useContext(WrapperContext);
	return(
		<Grid container spacing={1} sx={{ background: '#ffffff1a', borderRadius: '6px',padding: '20px'}}>
			<Grid item container sx={{ marginBottom: '10px' }}>
				<TextOnline sx={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>Danh sách phát</TextOnline>
			</Grid>
			{data?.map((item, index) => {
				const handle = useCallback(() => {
					setShowPlayVideo(true);
					setIdVideo(item?.id);
				}, [item?.id])
				return(
					<Grid item container key={index} spacing={2} alignItems="center"
						onClick={handle}
						sx={{
							cursor: 'pointer',
						}}>
						<Grid item>
							<img alt="" src={item?.thumbnail} style={{ height: '60px', width: '120px', borderRadius: '4px' }}/>
						</Grid>
						<Grid item xs>
							<TextLineClamp
								sx={{ fontSize: '15px', color: 'white', fontWeight: 700, marginBottom: '5px' }}
								line={2}>{item?.title}
							</TextLineClamp>
							<TextOnline
								sx={{ color: '#ffffff80', fontSize: '12px', fontWeight: 500}}>
								{item?.artists?.name}
							</TextOnline>
						</Grid>
					</Grid>
				);
			})}
		</Grid>
	);
}

export default ListVideoRecommend;

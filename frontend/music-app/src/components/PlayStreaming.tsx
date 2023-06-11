/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { WrapperContext } from "@/containers/Layout";
import getStreamingDetail from "@/services/getStreamingDetail";
import { DataStreaming } from "@/schemas";
import { TextOnline } from "./Text";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import dynamic from 'next/dynamic'
import getStreamingRecommend from "@/services/getStreamingRecommend";

const ReactHlsPlayer = dynamic(import ("react-hls-player"), { ssr: false })

const PlayStreaming = () => {
	const { idStreaming, setShowStreaming } = useContext(WrapperContext);
	const [dataStreaming, setDataStreaming] = useState<DataStreaming>();
	const [dataStreamingRecommend, setDataStreamingRecommend] = useState<Array<DataStreaming>>();
	const playerRef = React.useRef<any>(null);

	useEffect(() => {
		if(idStreaming){
			getStreamingDetail.getAll(idStreaming).then(res => {
				setDataStreaming(res?.data?.data);
			})
		}
		getStreamingRecommend.getAll().then(res => {
			setDataStreamingRecommend(res?.data?.data);
		})
	}, [idStreaming])

	const toggleClosePlayStreaming = useCallback(() => {
		setShowStreaming(false);
		localStorage.removeItem("idStreaming");
	}, [setShowStreaming])

	return(
		<Grid container height="100vh" width="100vw" sx={{ position: 'fixed', top: 0, left: 0, zIndex: 2 }}>
			<Grid item width="88px" height="100%"
				sx={{ background: '#21181c', flexDirection: 'column', paddingY: '10px', paddingX: '5px', overflow: 'auto' }}>
				{dataStreamingRecommend?.map((item, index) => {
					return(
						<ItemStreaming key={index} data={item} />
					);
				})}
			</Grid>
			<Grid item container xs
				sx={{
					backgroundImage: `url(${dataStreaming?.thumbnail_h})`,
					backgroundSize: 'contain',
					padding: '30px',
				}}>
				<Grid item container justifyContent="space-between" xs={8}>
					<Grid item container>
						<Grid item>
							<img alt=""
								src={dataStreaming?.thumbnail}
								style={{ borderRadius: '999px', boxShadow: '3px 5px gray' }}
							/>
						</Grid>
						<Grid item>
							<TextOnline sx={{ fontSize: '40px', fontWeight: 700, color: 'white'}}>
								{dataStreaming?.title}
							</TextOnline>
						</Grid>
					</Grid>
					<Grid item container>
						<ReactHlsPlayer
							playerRef={playerRef}
							src={dataStreaming?.streaming ? dataStreaming.streaming : ''}
							autoPlay={true}
							height="0"
							width="0"
						/>
					</Grid>
				</Grid>
				<Grid item container xs={4} justifyContent="flex-end">
					<Grid item container
						onClick={toggleClosePlayStreaming}
						sx={{
							height: '40px',
							width: '40px',
							background: 'gray',
							borderRadius: '999px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							cursor: 'pointer',
						}}>
						<ArrowCircleDownIcon sx={{ color: 'white' }}/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default PlayStreaming;


const ItemStreaming = ({ data }: { data: DataStreaming }) => {
	const { setIdStreaming, idStreaming } = useContext(WrapperContext);

	const toggleListStreaming = useCallback(() => {
		setIdStreaming(data?.id);
	}, [data?.id, setIdStreaming])

	return(
		<Grid container flexDirection="column" justifyContent="center" alignItems="center" sx={{ marginY: '8px' }}>
			<Grid item onClick={toggleListStreaming}>
				<img
					className={ idStreaming === data?.id ? 'list-img-streaming' : ''}
					src={data?.thumbnail_m} alt=""
					style={{
						borderRadius: '999px',
						height: '50px',
						width: '50px',
						cursor: 'pointer',
					}}/>
			</Grid>
		</Grid>
	);
}

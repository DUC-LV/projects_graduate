import React, { PropsWithChildren, useCallback, useState } from "react";
import { BackDrop } from "./Popup";
import { Box, Button, TextField, Typography } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Grid } from "@mui/material";
import axiosInstances from "@/services/axiosInstances";
import { artistNameCreateByUser, descriptionPlaylistCreateByUser, imagePlaylistCreateByUser } from "@/untils";
import { toast } from "react-toastify";

type PopupProps = {
	type?: 'default' | 'success' | 'error',
	title?: string,
	isShow?:boolean,
	onClose: () => void,
	showClose?: boolean,
	message?: string,
	actions?: { key: string; title: string; link?: string }[];
	onAction?: (key: string) => void;
}

const PopupCreatePlaylist = ({
	isShow,
	onClose,
}: PropsWithChildren<PopupProps>) => {

	const [value, setValue] = useState('');
	const [showMs, setshowMs] = useState(false);

	const createPlaylist = useCallback(() => {
		if (!value){
			setshowMs(true);
		}else {
			setshowMs(false);
			axiosInstances.post('create-playlist', {
				thumbnailM: imagePlaylistCreateByUser,
				thumbnail: imagePlaylistCreateByUser,
				title: value,
				sortDescription: descriptionPlaylistCreateByUser,
				artistsNames: artistNameCreateByUser,
			}).then(res => {
				toast.success(res.data.msg)
				setTimeout(() => {
					onClose();
				}, 2000)
			})
		}
	}, [onClose, value])

	return(
		<BackDrop>
			<Box
				sx={{
					visibility: !isShow ? 'hidden' : 'visible',
					opacity: !isShow ? 0 : 1,
					transition: '400ms',
					borderRadius: '16px',
					backgroundColor: '#34224f',
					boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
					position: 'fixed',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					p: '24px',
					color: 'white'
				}}>
				<Grid container sx={{ justifyContent: 'right', cursor: 'pointer' }} onClick={onClose}>
					<CloseOutlinedIcon />
				</Grid>
				<Grid container flexDirection="column">
					<Typography
						component={'div'}
						sx={{ fontWeight: '700', color: 'white', fontSize: '18px', marginY: '5px' }}>
						Tạo playlist mới
					</Typography>
					<TextField
						size="medium"
						InputProps={{
							disableUnderline: true,
							style: { color: 'black', fontWeight: '500', width: '450px', backgroundColor: 'white', borderRadius: '8px' },
						}}
						InputLabelProps={{
							style: {
								fontWeight: '500',
								color: 'gray'
							}
						}}
						variant='filled'
						label="Nhập tên playlist"
						type="text"
						onChange={(e: any) => {
							setValue(e.target.value);
						}}
					/>
					{ showMs && <Grid sx={{ mt: '10px' }}>
						<Typography component={'div'} sx={{ fontSize: '14px', fontWeight: '600', color: 'red', textAlign: 'center'}}>
							Phải nhập tên playlist
						</Typography>
					</Grid> }
					<Button variant="outlined" size="medium"
						sx={{
							width: '450px',border: 'none',
							backgroundColor: 'red',
							color: 'white',
							marginY: '10px',
							borderRadius: '8px',
							fontWeight: '700',
							fontSize: '16px',
							":hover": {
								backgroundColor: 'red',
								border: 'none',
							}
						}}
						onClick={createPlaylist}
					>Tạo mới</Button>
				</Grid>
			</Box>
		</BackDrop>
	);
}

export default PopupCreatePlaylist;

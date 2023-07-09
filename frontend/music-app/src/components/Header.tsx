import {Box, Grid } from "@mui/material";
import React, {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import TopicIcon from '@mui/icons-material/Topic';
import StarIcon from '@mui/icons-material/Star';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Popup from "./Popup";
import PopupCreatePlaylist from "./PopupCreatePlaylist";

interface ItemProps {
	link?: string,
	isActive?: boolean,
	icon?: any,
	name?: string,
}

const Items = ({ link, isActive, icon, name }: PropsWithChildren<ItemProps>) => {
	const router = useRouter();
	return(
		<Grid container
			onClick = {() => router.push(link ? link : '')}
			sx={{
				padding: '8px 25px',
				alignItems: 'center',
				color: isActive ? 'red' : 'white',
			}}
		>
			<Grid item>{icon}</Grid>
			<Grid item sx={{ marginLeft: '5px' }}>
				<Box
					sx={{
						fontSize: '16.5px',
						fontWeight: '700',
						margin: '1px 10px',
						cursor: 'pointer',
						"@media screen and (max-width: 1133px)": {
							display: 'none'
						},
					}}
				>{name}</Box>
			</Grid>
		</Grid>
	);
}
const Header = () => {
	const router = useRouter();
	const menu = [
		{
			id: 1,
			type: '',
			name: 'Thư Viện',
			link: '/my-music',
			isActive: (pathName: string) => /^\/my-music/.test(pathName),
			icon: <LibraryMusicIcon />
		},
		{
			id: 2,
			type: '',
			name: 'Khám Phá',
			link: '/',
			isActive: (pathName: string) => router.pathname === '/',
			icon: <HomeSharpIcon />
		},
		{
			id: 3,
			type: '',
			name: 'Radio',
			link: '/radio',
			isActive: (pathName: string) => /^\/radio/.test(pathName),
			icon: <RadioButtonCheckedIcon />
		},
	];

	const category = [
		{
			id: 1,
			type: '',
			name: 'Thể Loại',
			link: '/hub',
			isActive: (pathName: string) => /^\/hub/.test(pathName),
			icon: <TopicIcon />
		},
		{
			id: 2,
			type: '',
			name: 'Top 100',
			link: '/top100',
			isActive: (pathName: string) => /^\/top100/.test(pathName),
			icon: <StarIcon />
		},
		{
			id: 3,
			type: '',
			name: 'MV',
			link: '/videos',
			isActive: (pathName: string) => /^\/videos/.test(pathName),
			icon: <MusicVideoIcon />
		},
	];

	const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const checkout = typeof window !== 'undefined' ? localStorage.getItem('access_token') : undefined;

	const showPopup = useCallback(() => {
		if(checkout === null){
			setShowLogin(true);
		}else {
			setShowCreatePlaylist(true);
		}
	}, [checkout])


	return(
		<Box
			sx={{
				width: "240px",
				height: "100%",
				backgroundColor: '#000',
				"@media screen and (max-width: 1133px)": {
					width: '70px'
				},
				padding: '24px 0',
			}}
		>
			<Grid container flexDirection="column">
				<Grid item container
					sx={{
						"@media screen and (max-width: 1133px)": {
							justifyContent: 'center'
						},
						"@media screen and (min-width: 1133px)": {
							margin: '0 25px',
						},
						width: 'fit-content'
					}}>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						className="imageHeaderBig"
						alt=""
						src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
						style={{
							height: '40px',
							margin: '5px 0',
						}}
					/>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						className="imageHeaderSmall"
						alt=""
						src="https://i.pinimg.com/originals/f0/5c/bc/f05cbc8c0f8b075d2b4f1f68fee49649.jpg"
						style={{
							height: '40px',
							margin: '5px 0',
						}}
					/>
				</Grid>
				<Grid item container sx={{ flexDirection: 'column', marginTop: '30px' }}>
					{menu?.map((item:any, index) => {
						return(
							<Box key={index}>
								<Items
									link={item?.link}
									isActive={item?.isActive(router.pathname)}
									icon={item?.icon}
									name={item?.name}
								/>
							</Box>
						)
					})}
				</Grid>
				<Box sx={{ height: '0.5px', width: '100%', background: '#393243', margin: '20px 0'}}></Box>
				<Grid item container sx={{ flexDirection: 'column' }}>
					{category?.map((item:any, index) => {
						return(
							<Box key={index}>
								<Items
									link={item?.link}
									isActive={item?.isActive(router.pathname)}
									icon={item?.icon}
									name={item?.name}
								/>
							</Box>
						)
					})}
				</Grid>
				<Grid container
					onClick={showPopup}
					sx={{
						padding: '8px 25px',
						alignItems: 'center',
					}}
				>
					<Grid item>
						<AddCircleOutlinedIcon sx={{ color: 'white' }}/>
					</Grid>
					<Grid item sx={{ marginLeft: '5px' }}>
						<Box
							sx={{
								fontSize: '16.5px',
								fontWeight: '700',
								margin: '1px 10px',
								cursor: 'pointer',
								"@media screen and (max-width: 1133px)": {
									display: 'none'
								},
								color: 'white'
							}}
						>Tạo playlist</Box>
					</Grid>
				</Grid>
			</Grid>
			<Popup
				isShow={showLogin}
				onClose={() => setShowLogin(false)}
				title="Thông Báo"
				message="Vui lòng đăng nhập lại để tiếp tục sử dụng dịch vụ."
				actions={[
					{ key: 'cancel', title: 'Đóng' },
					{ key: 'ok', title: 'Đăng nhập' },
				]}
				onAction={ key => {
					if(key === 'ok'){
						router.push('/login');
						setShowLogin(false);
					} else if (key === 'cancel'){
						setShowLogin(false);
					}
				}}
			/>
			{ showCreatePlaylist && <PopupCreatePlaylist
				isShow={showCreatePlaylist}
				onClose={() => {
					setShowCreatePlaylist(false);
				}}
			/>}
		</Box>
	);
}

export default Header;

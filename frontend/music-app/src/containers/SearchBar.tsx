import { Box, Button, Grid, Input, Typography } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CurrentUserData } from "@/schemas";
import useClickOutside from "use-click-outside";
import Cookies from "js-cookie";
import { WrapperContext } from "./Layout";

const InputSearch = () => {
	const router = useRouter();
	const [searchTxt, setSearchTxt] = useState('');
	return(
		<Grid container
			sx={{
				height: '40px',
				width: '400px',
				position: 'relative',
				background: '#121212',
				borderRadius: '20px',
				alignItems: 'center',
				border: '1px solid #737372'
			}}
		>
			<Grid item xs={10.5}>
				<Input
					placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát ..."
					sx={{
						position: 'absolute',
						left: '20px',
						top: '0',
						height: '100%',
						width: '330px',
						border: 'none',
						color: 'white',
						"::placeholder": {
							color: 'rgba(255, 255, 255, 0.5)',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}
					}}
				/>
			</Grid>
			<Grid
				item xs
				sx={{
					background: '#202020',
					height: '100%',
					borderRadius: '0 20px 20px 0',
					position: 'relative',
					cursor: 'pointer',
				}}
				onClick={() => {
				}}
			>
				<SearchIcon
					sx={{
						height: '30px',
						width: '30px',
						color: '#DADADA',
						position: 'absolute',
						left: '8px',
						top: '4px',
					}}
				/>
			</Grid>
		</Grid>
	);
}
const SearchBar = ({ currentUser } : { currentUser: CurrentUserData | null }) => {

	const router = useRouter();
	const [isShow, setIsShow] = useState(false);
	const checkLogin = typeof window !== 'undefined' ? localStorage.getItem('access_token') : undefined;
	const { setShowPlayMusic } = useContext(WrapperContext);

	const ref = useRef<HTMLDivElement>(null);
	useClickOutside(ref, () => {
		setIsShow(false);
	})

	return(
		<Grid container sx={{ backgroundColor: '#101010', height: '70px', width: '100%', padding: '0 24px'}} ref={ref}>
			<Grid item container sx={{ height: '100%', alignItems: 'center'}} xs={6} md={7}>
				<InputSearch />
			</Grid>
			<Grid item container sx={{ alignItems: 'center', justifyContent: 'flex-end'}} xs={6} md={5}>
				<Button
					variant="outlined"
					sx={{
						marginX: '20px',
						color: 'white',
						backgroundColor: 'red',
						border: 'none',
						":hover": {
							backgroundColor: 'red',
							border: 'none',
						}
					}}>
				Mua gói</Button>
				<Button>
					<AccountCircleIcon
						onClick={() => setIsShow(!isShow)}
						sx={{
							height: '40px',
							width: '40px',
							color: 'white',
							cursor: 'pointer',
						}}
					/>
				</Button>

				{isShow && (
					checkLogin ? (
						<Grid container direction="column"
							sx={{
								top: '70px',
								position: 'absolute',
								height: '110px',
								width: '200px',
								backgroundColor: '#2F4F4F',
								transition: 'opacity 2000ms ease-in-out',
								borderRadius: '8px',
								zIndex: 2
							}}
						>
							<Typography textTransform="capitalize" component={'div'}
								sx={{
									fontSize: '16px',
									fontWeight: '600',
									color: 'white',
									padding: '15px',
								}}
							>Xin chào: {currentUser?.userName}</Typography>
							<Box sx={{ height: '1px', width: '100%', background: 'grey' }}></Box>
							<Grid container item
								onClick={() => {
									localStorage.removeItem("access_token");
									localStorage.removeItem("refresh_token");
									Cookies.remove("access_token");
									setTimeout(() => {
										router.push('/login')
									}, 500)
									setIsShow(false);
									localStorage.removeItem("dataPlayMusic");
								}}
								sx={{
									padding: '15px',
									":hover": {
										background: 'hsla(0,0%,100%,0.1)',
										borderRadius: '0 0 8px 8px'
									},
									cursor: 'pointer',
								}}
							>
								<Typography component={'div'} textTransform="initial" sx={{ color: 'white', fontWeight: '600', fontSize: '16px'}}
								>Đăng xuất</Typography>
							</Grid>
						</Grid>
					):(
						<Box
							onClick={() => {
								router.push('/login');
								setIsShow(false);
							}}
							sx={{
								position: 'absolute',
								top: '70px',
								height: '50px',
								width: '200px',
								backgroundColor: '#2F4F4F',
								transition: 'opacity 2000ms ease-in-out',
								padding: '15px',
								alignItems: 'center',
								cursor: 'pointer',
								borderRadius: '8px',
								zIndex: 2,
							}}
						>
							<Typography component={'div'} textTransform="initial" sx={{ color: 'white', fontWeight: '600', fontSize: '16px'}}
							>Đăng nhập</Typography>
						</Box>
					)
				)}
			</Grid>
		</Grid>
	);
}

export default SearchBar;

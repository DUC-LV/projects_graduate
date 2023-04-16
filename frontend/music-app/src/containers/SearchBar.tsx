import { Box, Button, Grid, Input } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";
import PersonIcon from '@mui/icons-material/Person';

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
const SearchBar = () => {
	const router = useRouter();
	const [isShow, setIsShow] = useState(false);
	return(
		<Grid container sx={{ backgroundColor: '#101010', height: '70px', width: '100%', padding: '0 24px'}}>
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
					<PersonIcon
						onClick={() => setIsShow(!isShow)}
						sx={{
							height: '50px',
							width: '50px',
							color: 'white',
							cursor: 'pointer',
							position: 'relative',
						}}
					/>
					{ isShow && (
						<Box
							onClick={() => {
								router.push('/login');
								setIsShow(false);
							}}
							sx={{
								position: 'absolute',
								top: '110%',
								height: '50px',
								width: '180px',
								backgroundColor: '#34224f',
								right: '20%',
								transition: 'opacity 2000ms ease-in-out',
								padding: '15px',
								alignItems: 'center',
								cursor: 'pointer',
								borderRadius: '8px'
							}}
						>Đăng nhập</Box>
					)}
				</Button>
			</Grid>
		</Grid>
	);
}

export default SearchBar;

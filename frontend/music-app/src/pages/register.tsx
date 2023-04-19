import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputItems from '@/components/InputItems';
import { useRouter } from 'next/router';


const RegisterPage = () => {
	const router = useRouter();
	return(
		<Grid container direction={'column'} sx={{ justifyContent: 'center', alignItems: 'center'}}>
			<Grid container item direction={'column'} sx={{ justifyContent: 'center', alignItems: 'center', marginY: '10px'}}>
				<AccountCircleIcon sx={{ height: '50px', width: '50px', color: 'white'}}/>
				<Typography
					sx={{ fontSize: '20px', fontWeight: '700', color: 'white', marginY: '20px'}}>
					Đăng ký miễn phí để bắt đầu nghe.
				</Typography>
			</Grid>
			<Grid container item sx={{ justifyContent: 'center', alignItems: 'center'}} direction={"column"}>
				<Grid sx={{ marginY: '5px' }}>
					<InputItems
						title="Email của bạn là gì?"
						type="text"
						placeholder="Nhập email của bạn"
					/>
				</Grid>
				<Grid sx={{ marginY: '5px' }}>
					<InputItems
						title="Bạn tên là gì?"
						type="text"
						placeholder="Nhập tên hồ sơ"
					/>
				</Grid>
				<Grid sx={{ marginY: '5px' }}>
					<InputItems
						title="Mật khẩu"
						type="password"
						placeholder="Mật khẩu"
					/>
				</Grid>
			</Grid>
			<Button variant="contained" size="medium"
				sx={{
					width: '450px',border: 'none',
					color: 'white',
					marginY: '15px',
					borderRadius: '8px',
					backgroundColor: '#1db954',
					fontWeight: '700',
					fontSize: '16px',
					":hover": {
						backgroundColor: '#1db954',
						border: 'none',
					}
				}}
			>Đăng kí</Button>
			<Grid container item sx={{ justifyContent: 'center', alignItems: 'center' }}>
				<Typography sx={{ fontWeight: '500', color: 'white', fontSize: '14px', marginY: '5px' }}>
					Bạn có tài khoản?
				</Typography>&nbsp;
				<Typography
					onClick={() => {
						router.push('/login')
					}}
					sx={{
						fontWeight: '500',
						color: '#1db954',
						fontSize: '14px',
						marginY: '5px',
						textDecoration: 'underline',
						cursor: 'pointer'
					}}
				>Đăng nhập</Typography>
			</Grid>
		</Grid>
	);
}
export default RegisterPage;

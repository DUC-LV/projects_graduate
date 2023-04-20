import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputItems from '@/components/InputItems';
import { useRouter } from 'next/router';
import useFormLogin from '@/hooks/useFormLogin';
import axiosInstances from '@/services/axiosInstances';
import { toast } from 'react-toastify';


const RegisterPage = () => {
	const router = useRouter();
	const email = useFormLogin('');
	const username = useFormLogin('');
	const password = useFormLogin('');

	const handleRegister = (e: any) => {
		e.preventDefault();

		try {
			axiosInstances.post('api/register',
			{ email: email.value, user_name: username.value, password: password.value }).then(res => {
				if(res.status === 200){
					setTimeout(() => {
						router.push('/login')
					}, 1000);
				}
				toast.success("Đăng kí thành công!");
			})
		} catch(error) {
			console.log(error);
		}
	}
	return(
		<Grid container direction={'column'} sx={{ justifyContent: 'center', alignItems: 'center'}}>
			<Grid container item direction={'column'} sx={{ justifyContent: 'center', alignItems: 'center', marginY: '10px'}}>
				<AccountCircleIcon sx={{ height: '50px', width: '50px', color: 'white'}}/>
				<Typography
					sx={{ fontSize: '20px', fontWeight: '700', color: 'white', marginY: '10px'}}>
					Đăng ký miễn phí để bắt đầu nghe.
				</Typography>
			</Grid>
			<Grid container item sx={{ justifyContent: 'center', alignItems: 'center'}} direction={"column"}>
				<Grid sx={{ marginY: '5px' }}>
					<InputItems
						title="Email của bạn là gì?"
						type="text"
						placeholder="Nhập email của bạn"
						value={email}
					/>
				</Grid>
				<Grid sx={{ marginY: '5px' }}>
					<InputItems
						title="Bạn tên là gì?"
						type="text"
						placeholder="Nhập tên hồ sơ"
						value={username}
					/>
				</Grid>
				<Grid sx={{ marginY: '5px' }}>
					<InputItems
						title="Mật khẩu"
						type="password"
						placeholder="Mật khẩu"
						value={password}
					/>
				</Grid>
			</Grid>
			<Button variant="contained" size="medium"
				onClick={handleRegister}
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

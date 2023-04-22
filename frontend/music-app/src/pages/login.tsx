import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputItems from "@/components/InputItems";
import { useRouter } from "next/router";
import useFormLogin from "@/hooks/useFormLogin";
import axiosInstances from "@/services/axiosInstances";
import { ToastContainer, toast } from "react-toastify";


const LoginPage = () => {
	const router = useRouter();
	const email = useFormLogin('');
	const password = useFormLogin('');

	const handleLogin = (e: any) => {
		e.preventDefault();

		try {
			axiosInstances.post('api/login', { email: email.value, password: password.value }).then(res => {
				if(res?.status === 200){
					localStorage.setItem("access_token", res.data.access);
					localStorage.setItem('refresh_token', res.data.refresh);
					setTimeout(() => {
						router.push('/')
					}, 1000);
					toast.success("Đăng nhập thành công!")
				}
			})
		} catch(error) {
			console.log(error)
		}
	}

	return(
		<Grid container direction={'column'} sx={{ justifyContent: 'center', alignItems: 'center'}}>
			<Grid container item direction={'column'} sx={{ justifyContent: 'center', alignItems: 'center', marginY: '10px'}}>
				<AccountCircleIcon sx={{ height: '50px', width: '50px', color: 'white'}}/>
				<Typography
					sx={{ fontSize: '20px', fontWeight: '700', color: 'white', marginY: '10px'}}>
					Đăng nhập
				</Typography>
			</Grid>
			<Grid container item sx={{ justifyContent: 'center', alignItems: 'center'}} direction={"column"}>
				<Grid sx={{ marginY: '5px' }}>
					<InputItems
						title="Địa chỉ email hoặc tên người dùng"
						type="text"
						placeholder="Địa chỉ email hoặc tên người dùng"
						value={email}
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
			<Button variant="outlined" size="medium"
				onClick={handleLogin}
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
			>Đăng nhập</Button>
			<Box sx={{ width: '450px', height: '1px', background: 'grey', marginY: '30px'}}></Box>
			<Typography sx={{ fontSize: '16px', fontWeight: '600', color: 'white'}}>Bạn chưa có tài khoản?</Typography>
			<Button variant="contained" size="medium"
				onClick={() => {
					router.push('/register')
				}}
				sx={{
					width: '450px',border: 'none',
					color: 'white',
					marginY: '10px',
					borderRadius: '8px',
					fontWeight: '700',
					fontSize: '16px'
				}}
			>Đăng kí tại đây</Button>
		</Grid>
	);
}

export default LoginPage;

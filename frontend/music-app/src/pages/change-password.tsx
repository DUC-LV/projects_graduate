import InputItems from "@/components/InputItems";
import useFormLogin from "@/hooks/useFormLogin";
import axiosInstances from "@/services/axiosInstances";
import { Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ChangePassword = () => {
	const router = useRouter();
	const old_password = useFormLogin('');
	const new_password = useFormLogin('');
	const confirm_new_password = useFormLogin('');
	const [check, setCheck] = useState();
	const [checkOldPassword, setCheckOldPassword] = useState(false);
	const [checkNewPassword, setCheckNewPassword] = useState(false);


	const handleChangePasswor = useCallback(() => {
		try {
			axiosInstances.post('change-password', {
				old_password: old_password,
				new_password: new_password,
				confirm_new_password: confirm_new_password,
			}).then(res => {
				setCheck(res?.data?.err);
			})
		}catch(error){
			console.log(error);
		}
	}, [confirm_new_password, new_password, old_password])

	useEffect(() => {
		if(check){
			if(check === 200){
				toast.success('Thay đổi mật khẩu thành công!');
			}else if (check === 201){
				setCheckOldPassword(true);
			}else if (check === 202){
				setCheckNewPassword(true);
			}
		}
	}, [check]);

	return(
		<Grid container direction={'column'} sx={{ justifyContent: 'center', alignItems: 'center'}}>
			<Grid container item direction={'column'} sx={{ justifyContent: 'center', alignItems: 'center', marginY: '10px'}}>
				<Typography component={'div'}
					sx={{ fontSize: '20px', fontWeight: '700', color: 'white', marginY: '10px'}}>
					Đổi mật khẩu
				</Typography>
			</Grid>
			<Grid container item sx={{ justifyContent: 'center', alignItems: 'center'}} direction={"column"}>
				<Grid sx={{ marginY: '5px' }}>
					<InputItems
						title="Mật khẩu cũ"
						type="text"
						placeholder="Nhập mật khẩu cũ"
						value={old_password}
					/>
				</Grid>
				{ checkOldPassword && <Grid>
					<Typography component={'div'} sx={{ fontSize: '12px', fontWeight: '600', color: 'red'}}>
						Mật khẩu hiện tại không đúng!
					</Typography>
				</Grid> }
				<Grid sx={{ marginY: '5px' }}>
					<InputItems
						title="Mật khẩu mới"
						type="text"
						placeholder="Nhập mật khẩu mới"
						value={new_password}
					/>
				</Grid>
				<Grid sx={{ marginY: '5px' }}>
					<InputItems
						title="Nhập lại mật khẩu mới"
						type="text"
						placeholder="Nhập lại mật khẩu mới"
						value={confirm_new_password}
					/>
				</Grid>
				{ checkNewPassword && <Grid>
				<Typography component={'div'} sx={{ fontSize: '12px', fontWeight: '600', color: 'red'}}>
					Xác nhận mật khẩu không khớp!
				</Typography>
			</Grid> }
			</Grid>
			<Button variant="contained" size="medium"
				onClick={handleChangePasswor}
				sx={{
					width: '450px',border: 'none',
					color: 'white',
					marginY: '10px',
					borderRadius: '8px',
					fontWeight: '700',
					fontSize: '16px'
				}}
			>Đổi mật khẩu</Button>
		</Grid>
	);
}

export default ChangePassword;



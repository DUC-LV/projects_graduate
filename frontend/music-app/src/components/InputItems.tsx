import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

type Props = {
	title?: string,
	value?: any,
	type?: string,
	placeholder?: string,
}

const InputItems = ({ title, value, type, placeholder }: Props) => {
	return(
		<Box>
			<Typography sx={{ fontWeight: '500', color: 'gray', fontSize: '14px', marginY: '5px' }}>{title}</Typography>
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
				label={`${placeholder}`}
				{...value}
				type={type}
			/>
		</Box>
	);
}

export default InputItems;

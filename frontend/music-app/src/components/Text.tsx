import React from "react";
import {BoxProps} from "@mui/system";
import { Box } from "@mui/material";

export const TextOnline = ({ sx, children, ...res }: BoxProps) => {
	return(
		<Box
			sx={{
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				...sx,
			}}
		>{children}</Box>
	);
}

interface TextLineClampType {
	line: number;
}
export const TextLineClamp = ({line, sx, children, ...rest}: TextLineClampType & BoxProps) => {
	return(
		<Box
			sx={{
				display: '-webkit-box',
				WebkitLineClamp: line,
				WebkitBoxOrient: 'vertical',
				overflow: 'hidden',
				...sx,
			}}
			{...rest}
		>{children}</Box>
	);
}

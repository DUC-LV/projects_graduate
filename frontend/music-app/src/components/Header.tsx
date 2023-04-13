import { Box } from "@mui/material";
import React from "react";

const Header = () => {
	return(
		<Box
			sx={{
				width: "240px",
				height: "100%",
				backgroundColor: '#000',
				"@media screen and (max-width: 1133px)": {
					width: '70px'
				}
			}}
		></Box>
	);
}

export default Header;

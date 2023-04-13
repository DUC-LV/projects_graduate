import Header from "@/components/Header";
import { Box } from "@mui/material";
import React from "react";
import SearchBar from "./SearchBar";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
	return(
		<>
			<Box sx={{ position: 'fixed', top: 0, left: 0, height: '100%' }}>
				<Header />
			</Box>
			<Box
				sx={{
					position: 'fixed',
					top: 0,
					left: '240px',
					right: 0,
					height: '70px',
					"@media screen and (max-width: 1133px)": {
						left: '70px',
					},
					backdropFilter: 'blur(10px)',
					backgroundColor: '#101010',
				}}
			>
				<SearchBar />
			</Box>
			<Box>{children}</Box>
		</>
	);
}

export default Layout;

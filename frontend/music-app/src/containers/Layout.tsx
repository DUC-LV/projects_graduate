import Header from "@/components/Header";
import {Box, Grid} from "@mui/material";
import React from "react";
import SearchBar from "./SearchBar";
import { CurrentUserData } from "@/schemas";

const Layout = ({ children, currentUser }: React.PropsWithChildren<{ currentUser: CurrentUserData | null}>) => {
	return(
		<Grid container spacing={0} sx={{ backgroundColor: '#1d1d1d', width: '100vw', height: '100vh'}}>
			<Grid item sx={{ maxWidth: '240px' }}>
				<Header />
			</Grid>
			<Grid item container direction="column" xs sx={{ overflow: 'hidden' }}>
				<Grid item sx={{ maxHeight: '70px' }}>
					<SearchBar currentUser={currentUser ? currentUser : null}/>
				</Grid>
				<Grid item container xs sx={{ overflow: 'auto'}}>
					<Box sx={{ width: '100%', padding: '24px', height: 1000}}>
						{children}
					</Box>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Layout;

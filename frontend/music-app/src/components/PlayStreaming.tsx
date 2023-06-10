import React from "react";
import { Grid } from "@mui/material";

const PlayStreaming = () => {
	return(
		<Grid container height="100vh" width="100vw" sx={{ position: 'fixed', top: 0, left: 0, zIndex: 2 }}>
			<Grid item width="88px" height="100%" sx={{  background: '#21181c' }}>
			</Grid>
			<Grid item xs sx={{ background: 'red'}}>
			</Grid>
		</Grid>
	);
}

export default PlayStreaming;

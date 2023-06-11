import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { MenuVideo } from "@/schemas";
import { useRouter } from "next/router";
import { TextOnline } from "../Text";


const MenuVideo = (props: { data: Array<MenuVideo> }) => {
	const { data } = props;
	const router = useRouter();
	return(
		<><Grid container>
			<Grid item>
				<Typography variant="h2" component={'div'}
					sx={{
						paddingRight: '15px',
						borderRight: '1px solid #ffffff1a',
						color: 'white',
						fontSize: '24px',
						fontWeight: '600'
					}}>
					MV
				</Typography>
			</Grid>
			<Grid item container alignItems={"center"} xs>
				{data?.map((item: any, index) => {
					return (
						<Grid item
							key={index}
							onClick={() => {
								router.push(`/videos/${item?.id}?id=${item?.id}`);
							} }
						>
							<TextOnline
								sx={{
									fontSize: '15px',
									margin: '0 30px',
									cursor: 'pointer',
									color: "white",
									fontWeight: '600'
								}}
							>{item.name}</TextOnline>
						</Grid>
					);
				})}
			</Grid>
		</Grid><Box sx={{ height: '1px', width: '100%', background: 'grey', margin: '20px 0px' }}></Box></>
	);
}

export default MenuVideo;

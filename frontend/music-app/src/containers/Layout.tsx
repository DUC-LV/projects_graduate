import Header from "@/components/Header";
import {Box, Grid} from "@mui/material";
import React, { createContext, useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import { CurrentUserData } from "@/schemas";
import { useRouter } from "next/router";
import PlayMusic from "@/components/PlayMusic";
import ListSongRecommend from "@/components/ListSongRecommend";
import PlayStreaming from "@/components/PlayStreaming";

export const WrapperContext = createContext<any>({});

const Layout = ({ children, currentUser }: React.PropsWithChildren<{ currentUser: CurrentUserData | null}>) => {
	const router = useRouter();
	const [overflow, setOverflow] = useState('auto');
	const [showPlayMusic, setShowPlayMusic] = useState(false);
	const dataSong = typeof window !== 'undefined' && localStorage.getItem("dataPlayMusic") ? JSON.parse(String(localStorage.getItem("dataPlayMusic"))) : '';
	const [id, setId] = useState(dataSong?.id ?? '')
	const [showListSong, setShowListSong] = useState(false);
	const type = dataSong?.type;
	const playerRef = useRef<HTMLVideoElement>(null);
	const [showStreaming, setShowStreaming] = useState(false);
	const [idStreaming, setIdStreaming] = useState(typeof window !== 'undefined' && localStorage.getItem("idStreaming") ? localStorage.getItem("idStreaming") : '');

	useEffect(() => {
		if(!dataSong){
			setShowPlayMusic(false);
		}else {
			setShowPlayMusic(true);
		}
	}, [dataSong])

	useEffect(() => {
		if(router.pathname === '/login' || router.pathname === '/register'){
			setOverflow('hidden');
		} else {
			setOverflow('auto');
		}
	}, [router.pathname])

	return(
		<WrapperContext.Provider
			value={{
				showPlayMusic,
				setShowPlayMusic,
				id,
				setId,
				type,
				showListSong,
				setShowListSong,
				showStreaming,
				setShowStreaming,
				idStreaming,
				setIdStreaming,
			}}>
			<Grid container spacing={0} sx={{ backgroundColor: '#1d1d1d', width: '100vw', height: '100vh'}} >
				<Grid item sx={{ maxWidth: '240px' }}>
					<Header />
				</Grid>
				<Grid item container direction="column" xs sx={{ overflow: 'hidden' }} >
					<Grid item sx={{ maxHeight: '70px' }}>
						<SearchBar currentUser={currentUser ? currentUser : null}/>
					</Grid>
					<Grid item container xs sx={{ overflow: `${overflow}`}}>
						<Box sx={{ width: '100%', padding: '24px', height: 1000}}>
							{children}
						</Box>
					</Grid>
				</Grid>
			</Grid>
			{ showPlayMusic && <PlayMusic playerEl={playerRef.current}/> }
			{ showListSong && <ListSongRecommend /> }
			{ showStreaming && <PlayStreaming /> }
		</WrapperContext.Provider>
	);
}

export default Layout;

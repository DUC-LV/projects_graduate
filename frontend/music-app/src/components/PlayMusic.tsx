/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { WrapperContext } from "@/containers/Layout";
import getSongDetail from "@/services/getSongDetail";
import { DataSong } from "@/schemas";
import { TextOnline } from "./Text";
import AudioControlBar from "./player/AudioControlBar";
import Typewriter from "typewriter-effect";
import FavoriteIcon from '@mui/icons-material/Favorite';
import axiosInstances from "@/services/axiosInstances";
import { toast } from "react-toastify";
import { VolumeButton } from "./player/ControlBarBase";
import QueueMusicOutlinedIcon from '@mui/icons-material/QueueMusicOutlined';
import getPodcastEpisodeDetail from "@/services/getPodcastEpisodeDetail";

const MUTED_KEY = 'v-volume-muted';
const VOLUME_KEY = 'v-volume';

const PlayMusic = ({ playerEl }: { playerEl : HTMLVideoElement | null }) => {
	const { id, type, setShowListSong, showListSong } = useContext(WrapperContext);
	const [data, setData] = useState<DataSong>();
	const [like, setLike] = useState(false);
	const [muted, setMuted] = useState(false);
	const [volume, setVolume] = useState(1);
	const [playbackRate, setPlaybackRate] = useState(1);

	useEffect(() => {
		if(id){
			if (type === 'song'){
				getSongDetail.getAll(id).then(res => {
					setData(res?.data);
				})
			}else if (type === 'podcast'){
				getPodcastEpisodeDetail.getAll(id).then(res => {
					setData(res?.data);
				})
			}
		}
	}, [id, type])

	useEffect(() => {
		if (data?.follow?.length === 0) {
			setLike(false);
		} else if (data?.follow?.length === 1) {
			setLike(true);
		}
	}, [data?.follow?.length])

	const toggleLike = useCallback(() => {
		setLike(!like);
		axiosInstances.post('update-follow', { song_id: data?.id ?? '' }).then(res => {
			toast.success(res?.data?.msg)
		})
	}, [data?.id, like])

	const toggleShowListSong = useCallback(() => {
		if(type === 'song'){
			setShowListSong(!showListSong);
		}else if(type === 'podcast') {
			setShowListSong(false);
		}
	}, [setShowListSong, showListSong, type])

	useEffect(() => {
		if (!playerEl) return;
		setMuted(playerEl.muted);
		const handleVolumeChange = () => {
			setVolume(playerEl.volume);
			setMuted(playerEl.muted);
		};
		const handleReady = () => {
			const persistedVolume = window.localStorage.getItem(VOLUME_KEY);
			if (persistedVolume !== null) {
				playerEl.volume = Number(persistedVolume);
			}
			const persistedMute = window.localStorage.getItem(MUTED_KEY);
			if (persistedMute !== null) {
				const muted = 'true' === persistedMute;
				playerEl.muted = muted;
				setMuted(muted);
			}
		};
		const handleRateChange = () => {
			const playbackRate = playerEl.playbackRate;
			if (playbackRate !== null) {
				// window.localStorage.setItem(backRateKey, String(playbackRate));
				setPlaybackRate(playbackRate);
			}
		};
		// add listeners
		playerEl.addEventListener('volumechange', handleVolumeChange);
		playerEl.addEventListener('ready', handleReady);
		playerEl.addEventListener('ratechange', handleRateChange);
		return () => {
			// remove listeners
			playerEl.removeEventListener('volumechange', handleVolumeChange);
			playerEl.removeEventListener('ready', handleReady);
			playerEl.removeEventListener('ratechange', handleRateChange);
		};
	}, [playerEl]);

	const handleMuteVolume = (muted: boolean) => {
		if (playerEl) {
			playerEl.muted = muted;
			window.localStorage.setItem(MUTED_KEY, String(muted));
		}
	};
	const handleChangeVolume = (vol: number) => {
		if (playerEl) {
			playerEl.volume = vol;
			window.localStorage.setItem(VOLUME_KEY, String(vol));
		}
	};

	const setPlayerPlaybackRate = (playbackRate: number) => {
		if (playerEl) playerEl.playbackRate = playbackRate;
	};


	return(
		<Grid container
			sx={{
				position: 'fixed',
				bottom: 0,
				left: 0,
				color: 'white',
				height: '80px',
				width: '100%',
				background: '#130c1c',
				zIndex: 2,
				padding: '6px',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}>
			<Grid xs item container alignItems="center">
				<Grid item>
					<img alt="" src={data?.thumbnail} style={{ height: '64px', width: '64px', borderRadius: '8px', cursor: 'pointer'}}/>
				</Grid>
				<Grid item flexDirection="column" sx={{ marginLeft: '12px' }}>
					<TextOnline sx={{ fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>
						{data?.title}
					</TextOnline>
					<TextOnline sx={{ fontSize: '11px', fontWeight: 400, color: '#ffffff80' }}>
						{data?.artist_names}
					</TextOnline>
				</Grid>
			</Grid>
			<Grid xs item container justifyContent="center" flexDirection="column">
				<Grid item>
					<Typography component={'div'} sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: 'white' }}>
						<Typewriter
							options={{
								strings: data?.title,
								autoStart: true,
								loop: true,
							}}
						/>
					</Typography>
				</Grid>
				<Grid item>
					<AudioControlBar urlStremingSong={data?.streaming?.[128]}/>
				</Grid>
			</Grid>
			<Grid xs item container justifyContent="flex-end">
				<Grid item sx={{ marginRight: '12px' }}>
					<FavoriteIcon sx={{ color:  like ? '#9b4de0' : 'white', cursor: 'pointer' }} onClick={toggleLike}/>
				</Grid>
				<Grid item>
					<VolumeButton
						isMuted={muted}
						setIsMuted={handleMuteVolume}
						volume={volume}
						setVolume={handleChangeVolume}
					/>
				</Grid>
				<Grid item sx={{ marginRight: '10px', cursor: 'pointer' }} onClick={toggleShowListSong}>
					<QueueMusicOutlinedIcon sx={{ color: showListSong}}/>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default PlayMusic;

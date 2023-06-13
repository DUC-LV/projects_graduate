import { Box, Grid } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';


export const PrevButton  = () => {
	return(
		<Box>
			<SkipPreviousIcon
				sx={{ marginX: '7px', cursor: 'pointer', color: 'white' }}
			/>
		</Box>
	);
}

export const PlayButton = (
	{
		isPlay,
		onPlayMusic,
		onPauseMusic
	} : {
		isPlay: boolean,
		onPlayMusic: () => void,
		onPauseMusic: () => void
	}) => {
	return(
		<Box>
			{
				isPlay ? (
					<PauseCircleOutlineOutlinedIcon
						sx={{ marginX: '7px', cursor: 'pointer', color: 'white', height: '35px', width: '35px', opacity: 0.8 }}
						onClick={onPauseMusic}
					/>
				):(
					<PlayCircleOutlineOutlinedIcon
						sx={{ marginX: '7px', cursor: 'pointer', color: 'white', height: '35px', width: '35px', opacity: 0.8 }}
						onClick={onPlayMusic}
					/>
				)
			}
		</Box>
	);
}

export const NextButton = () => {
	return(
		<Box>
			<SkipNextIcon
				sx={{ marginX: '7px', cursor: 'pointer', color: 'white' }}
			/>
		</Box>
	);
}

export const RandomPlayMusic = ({ isClickRandom, onClickRadom }: { isClickRandom: boolean, onClickRadom: () => void }) => {
	return(
		<Box>
			{
				isClickRandom ? (
					<ShuffleOutlinedIcon
						sx={{ marginX: '7px', cursor: 'pointer', color: 'white' }}
						onClick={onClickRadom}
					/>
				):(
					<ShuffleOutlinedIcon
						sx={{ marginX: '7px', cursor: 'pointer', color: '#c273ed' }}
						onClick={onClickRadom}
					/>
				)
			}
		</Box>
	);
}

export const RepeatMusic = ({ isClickRepeat, onClickRepeat }: { isClickRepeat: boolean, onClickRepeat: () => void }) => {
	return(
		<Box>
			{
				isClickRepeat ? (
					<RepeatOutlinedIcon
						sx={{ marginX: '7px', cursor: 'pointer', color: 'white' }}
						onClick={onClickRepeat}
					/>
				):(
					<RepeatOutlinedIcon
						sx={{ marginX: '7px', cursor: 'pointer', color: '#c273ed' }}
						onClick={onClickRepeat}
					/>
				)
			}
		</Box>
	);
}

const limitNumber = (x: number, a = 0, b = 1) => Math.max(Math.min(x, b), a);

const VOLUME_PROGRESS_LENGTH = 50; // px
const VOLUME_PROGRESS_CUE_SIZE = 12; //px

export const VolumeButton = ({
	volume = 1,
    setVolume,
    isMuted,
    setIsMuted,
}: {
    volume: number;
    setVolume: (v: number) => void;
    isMuted: boolean;
    setIsMuted: (muted: boolean) => void;
}) => {
    const [isHover, setIsHover] = useState(false);
    const volumeBarRef = useRef<HTMLDivElement>(null);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const onMouseDown = useCallback(() => {
        setIsMouseDown(true);
    }, [setIsMouseDown]);

    const onMouseUp = useCallback(
        (e: MouseEvent) => {
            if (volumeBarRef.current && volumeBarRef.current.clientWidth) {
                setVolume(
                    limitNumber(
                        (e.clientX - volumeBarRef.current.getBoundingClientRect().left) /
                            volumeBarRef.current.clientWidth
                    )
                );
                setIsMuted(false);
            }
            setIsMouseDown(false);
        },
        [setVolume, setIsMuted]
    );

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            if (volumeBarRef.current && volumeBarRef.current.clientWidth) {
                setVolume(
                    limitNumber(
                        (e.clientX - volumeBarRef.current.getBoundingClientRect().left) /
                            volumeBarRef.current.clientWidth
                    )
                );
                setIsMuted(false);
            }
        },
        [setIsMuted, setVolume]
    );

    useEffect(() => {
        if (isMouseDown) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            return () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
        }
        return;
    }, [isMouseDown, onMouseUp, onMouseMove]);

    const doesShowVolumeSlider = isHover || isMouseDown;
	return(
		<Grid container
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<Grid item>
				<VolumeUpIcon />
			</Grid>
			<Grid item container
				sx={{
					position: 'relative',
					marginRight: doesShowVolumeSlider ? '0px' : '80px',
					width: doesShowVolumeSlider ? `${VOLUME_PROGRESS_LENGTH + 30}px` : 0,
				}}>
				<Box
					ref={volumeBarRef}
					onMouseDown={onMouseDown}
					sx={{
						position: 'absolute',
						top: 0,
						left: '8px',
						width: `${VOLUME_PROGRESS_LENGTH}px`,
						cursor: 'pointer',
					}}>
					<Box
						sx={{
							position: 'absolute',
							top: '10px',
							width: `${VOLUME_PROGRESS_LENGTH}px`,
							height: '3px',
							background: 'white',
						}}>
						<Box
							style={{ width: `${volume * 100}%` }}
							sx={{
								position: 'absolute',
								height: '100%',
								background: 'white',
							}}
						/>
						<Box
							style={{ left: `${volume * 100}%` }}
							sx={{ position: 'absolute', top: 0, pointerEvents: 'none' }}>
							<Box
								sx={{
									position: 'absolute',
									top: `-${(VOLUME_PROGRESS_CUE_SIZE - 3) / 2}px`,
									left: `-${VOLUME_PROGRESS_CUE_SIZE / 2}px`,
									borderRadius: '50%',
									width: `${VOLUME_PROGRESS_CUE_SIZE}px`,
									height: `${VOLUME_PROGRESS_CUE_SIZE}px`,
									background: 'white',
								}}
							/>
						</Box>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
}

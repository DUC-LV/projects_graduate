import { Box, Grid } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';


export const PrevButton  = () => {
	return(
		<Box>
			<SkipPreviousIcon
				sx={{ marginX: '7px', cursor: 'pointer', color: 'white' }}
			/>
		</Box>
	);
}

export const PlayButton = ({ isPlay, onClickMusic } : {isPlay: boolean, onClickMusic: () => void}) => {
	return(
		<Box>
			{
				isPlay ? (
					<PauseCircleOutlineOutlinedIcon
						sx={{ marginX: '7px', cursor: 'pointer', color: 'white', height: '35px', width: '35px' }}
						onClick={onClickMusic}
					/>
				):(
					<PlayCircleOutlineOutlinedIcon
						sx={{ marginX: '7px', cursor: 'pointer', color: 'white', height: '35px', width: '35px' }}
						onClick={onClickMusic}
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
		<Grid></Grid>
	);
}

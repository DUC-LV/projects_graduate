import { Box } from "@mui/material";
import React from "react";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
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
					<PauseIcon
						sx={{ marginX: '7px', cursor: 'pointer', color: 'white' }}
						onClick={onClickMusic}
					/>
				):(
					<PlayArrowIcon
						sx={{ marginX: '7px', cursor: 'pointer', color: 'white' }}
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

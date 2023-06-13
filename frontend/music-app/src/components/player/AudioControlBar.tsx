import { Grid } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { NextButton, PlayButton, PrevButton, RandomPlayMusic, RepeatMusic } from "./ControlBarBase";
import { urlStreamingSongDefault } from "@/untils";
import { WrapperContext } from "@/containers/Layout";

const AudioControlBar = ({ urlStremingSong }: { urlStremingSong?: string }) => {
	const [isPlay, setIsPlay] = useState(true);
	const [isClickRandom, setIsClickRandom] = useState(true);
	const [isClickRepeat, setIsClickRepeat] = useState(true);
	const [audioDom, setAdudioDom] = useState<HTMLAudioElement | null>(null);
	const { setId, id } = useContext(WrapperContext);

	const onPlayMusic = useCallback(() => {
		if(audioDom && isPlay === false){
			setIsPlay(true);
			audioDom.play();
		}
	}, [audioDom, isPlay]);

	const onPauseMusic = useCallback(() => {
		if(audioDom && isPlay === true){
			setIsPlay(false);
			audioDom.pause();
		}
	}, [audioDom, isPlay]);

	const onClickRadom = useCallback(() => {
		setIsClickRandom(!isClickRandom);
	}, [isClickRandom]);

	const onClickRepeat = useCallback(() => {
		setIsClickRepeat(!isClickRepeat);
	}, [isClickRepeat]);

	const onNextButtom = useCallback(() => {
		setId(id + 1);
		setIsPlay(true);
	},[id, setId]);

	const onPrevButtom = useCallback(() => {
		if(id <= 1){
			return;
		} else {
			setId(id - 1);
			setIsPlay(true);
		}
	},[id, setId]);

	return(
		<Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
			<Grid item>
				<RandomPlayMusic isClickRandom={isClickRandom} onClickRadom={onClickRadom}/>
			</Grid>
			<Grid item>
				<PrevButton onPrevButtom={onPrevButtom}/>
			</Grid>
			<Grid item>
				<audio src={urlStremingSong} autoPlay ref={(element) => setAdudioDom(element)}></audio>
			</Grid>
			<Grid item>
				<PlayButton isPlay={isPlay} onPauseMusic={onPauseMusic} onPlayMusic={onPlayMusic}/>
			</Grid>
			<Grid item>
				<NextButton onNextButtom={onNextButtom}/>
			</Grid>
			<Grid item>
				<RepeatMusic isClickRepeat={isClickRepeat} onClickRepeat={onClickRepeat}/>
			</Grid>
		</Grid>
	);
}

export default AudioControlBar;

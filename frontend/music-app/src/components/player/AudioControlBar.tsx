import { Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { NextButton, PlayButton, PrevButton, RandomPlayMusic, RepeatMusic } from "./ControlBarBase";
import { urlStreamingSongDefault } from "@/untils";

const AudioControlBar = ({ urlStremingSong }: { urlStremingSong?: string }) => {
	const [isPlay, setIsPlay] = useState(true);
	const [isClickRandom, setIsClickRandom] = useState(true);
	const [isClickRepeat, setIsClickRepeat] = useState(true);
	const [audioDom, setAdudioDom] = useState<HTMLAudioElement | null>(null);

	const onClickMusic = useCallback(() => {
		setIsPlay(!isPlay)
	}, [isPlay]);

	useEffect(() => {
        if (audioDom && isPlay === true) {
			audioDom.play;
        }
        if (audioDom && isPlay === false) {
            audioDom.pause();
        }

    }, [audioDom, isPlay]);

	const onClickRadom = useCallback(() => {
		setIsClickRandom(!isClickRandom)
	}, [isClickRandom])

	const onClickRepeat = useCallback(() => {
		setIsClickRepeat(!isClickRepeat);
	}, [isClickRepeat])

	return(
		<Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
			<Grid item>
				<RandomPlayMusic isClickRandom={isClickRandom} onClickRadom={onClickRadom}/>
			</Grid>
			<Grid item>
				<PrevButton />
			</Grid>
			<Grid item>
				<audio src={''} autoPlay ref={(element) => setAdudioDom(element)}></audio>
			</Grid>
			<Grid item>
				<PlayButton isPlay={isPlay} onClickMusic={onClickMusic}/>
			</Grid>
			<Grid item>
				<NextButton />
			</Grid>
			<Grid item>
				<RepeatMusic isClickRepeat={isClickRepeat} onClickRepeat={onClickRepeat}/>
			</Grid>
		</Grid>
	);
}

export default AudioControlBar;

import { hover } from '@testing-library/user-event/dist/hover';
import ReactAudioPlayer from 'react-audio-player';
//...

function AudioPlayer({currentQuestion}) {
    return (
        <ReactAudioPlayer
        style={{pointerEvents: "click"}}
        title="audio player"
        src={"./audio/"+currentQuestion.audio}
        controls
        />
    )
}

export default AudioPlayer;

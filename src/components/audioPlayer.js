import ReactAudioPlayer from 'react-audio-player';
//...

function AudioPlayer({currentQuestion}) {
    return (
        <ReactAudioPlayer
        src={"./audio/"+currentQuestion.audio}
        controls
        />
    )
}

export default AudioPlayer;

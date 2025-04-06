import ReactAudioPlayer from 'react-audio-player';
//...

function AudioPlayer({currentQuestion}) {
    return (
        <ReactAudioPlayer
        title="audio player"
        src={"./audio/"+currentQuestion.audio}
        controls
        />
    )
}

export default AudioPlayer;

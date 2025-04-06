import ReactPlayer from 'react-player';
//...

function VideoPlayer({currentQuestion}) {
    return (
        <ReactPlayer
        title="video player"
        url={"./video/"+currentQuestion.video}
        controls
        />
    )
}

export default VideoPlayer;

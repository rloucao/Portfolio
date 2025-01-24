import React from 'react';
import video from '../assets/background.mp4';


const VideoBackground = () => {
 return (
  <div className='video-wrapper'>
    <video src={video} autoPlay loop muted></video>
  </div>
 );
};


export default VideoBackground;



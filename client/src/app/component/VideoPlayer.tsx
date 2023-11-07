import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  options: any;
}

const initialOptions: any = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false
    }
  }
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ options }) => {
  const videoNode = useRef<HTMLVideoElement>();
  const player = useRef<any>();

  useEffect(() => {
    player.current = videojs(videoNode.current as HTMLVideoElement, {
      ...initialOptions,
      ...options
    }).ready(function() {
      // console.log('onPlayerReady', this);
    });
    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [options]);

  return <video ref={videoNode as any} style={{ width: "100%" }} className="video-js"/>;
};

export default VideoPlayer;

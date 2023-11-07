"use client";

import { Post } from "@/types/models";
import { Box } from "@mui/material";
import VideoPlayer from "./VideoPlayer";
import ReactAudioPlayer from "react-audio-player";

export type MediaPlayer = {
  postData: Post;
};

const MediaPlayer: React.FC<MediaPlayer> = ({ postData }) => {
  if (!postData.file) return <></>;
  else {
    const type = postData.file.type.split("/")[0];
    if (type === "video") {
      const videoJsOptions = {
        sources: [
          {
            src: postData.file?.url,
            type: postData.file?.type,
          },
        ],
      };
      return (
        <Box mt={3} width="100%">
          <VideoPlayer options={videoJsOptions} />
        </Box>
      );
    }
    if (type === "image") {
      return (
        <Box mt={3} width="100%">
          <img
            src={postData.file.url}
            style={{ width: "100%", height: "auto" }}
          ></img>
        </Box>
      );
    }
    if (type === "audio") {
      return (
        <Box mt={3} width="100%">
          <ReactAudioPlayer
            src={postData.file.url}
            style={{ width: "100%" }}
            controls
          />
        </Box>
      );
    }
  }
  return <></>;
};

export default MediaPlayer;

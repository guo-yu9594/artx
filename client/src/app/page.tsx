"use client";

import PostService from "@/services/postService";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Post } from "@/types/models";
import PostCard from "./component/PostCard";
import UserService from "@/services/userService";
import { Typography } from "@mui/material";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedIds, setLikedId] = useState<number[]>([]);
  const [savedIds, setSavedId] = useState<number[]>([]);

  useEffect(() => {
    PostService.getNews({
      then: (res) => setPosts(res.data),
      error: (err) => console.error(err),
    });
    UserService.getUserLikedPostsId({
      then: (res) => setLikedId(res.data),
      error: (err) => console.error(err),
    });
    UserService.getUserSavedPostsId({
      then: (res) => setSavedId(res.data),
      error: (err) => console.error(err),
    });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
        "msOverflowStyle": "none",
        scrollbarWidth: "none",
      }}
    >
      <Typography color="primary" fontSize={30} fontWeight={300} mt={2}>
        {"> News"}
      </Typography>
      <ImageList variant="masonry" cols={2} gap={12}>
        {posts.map((item) => {
          const like = likedIds.includes(item.id);
          const save = savedIds.includes(item.id);

          return (
            <ImageListItem key={item.id}>
              <PostCard postData={item} like={like} save={save} />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
}

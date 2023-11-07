"use client";

import PostService from "@/services/postService";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Post } from "@/types/models";
import UserService from "@/services/userService";
import PostCard from "../component/PostCard";
import { Typography } from "@mui/material";

export default function LikedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [savedIds, setSavedId] = useState<number[]>([]);

  useEffect(() => {
    PostService.getLikedPosts({
      then: (res) => setPosts(res.data),
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
        {"> Liked ones"}
      </Typography>
      <ImageList variant="masonry" cols={2} gap={12}>
        {posts.map((item) => {
          const save = savedIds.includes(item.id);

          return (
            <ImageListItem key={item.id}>
              <PostCard postData={item} like={true} save={save} />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
}

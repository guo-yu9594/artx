import Box from "@mui/material/Box";
import { Post } from "@/types/models";
import {
  CardActionArea,
  Grow,
  IconButton,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import {
  BookmarkBorderSharp,
  BookmarkSharp,
  ChatBubbleOutlineSharp,
  DeleteOutlineSharp,
  FavoriteBorderSharp,
  FavoriteSharp,
} from "@mui/icons-material";
import PostService from "@/services/postService";
import { useState } from "react";
import MediaPlayer from "./MediaPlayer";
import CommentsModal from "./CommentsModal";

const style: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  minHeight: "85%",
  bgcolor: "secondary.main",
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export type PostCardProps = {
  postData: Post;
  like: boolean;
  save: boolean;
};

const PostCard: React.FC<PostCardProps> = ({ postData, like, save }) => {
  const [isLiked, setIsLiked] = useState(like);
  const [isSaved, setIsSaved] = useState(save);
  const [nbLike, setNbLike] = useState(postData.likes);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const user = JSON.parse(localStorage.getItem("artx-user") ?? "");
  const handleLike = () => {
    PostService.like({
      id: postData.id,
      then: (res) => {
        setIsLiked(true);
        setNbLike(nbLike + 1);
      },
      error: (err) => {},
    });
  };
  const handleUnlike = () => {
    PostService.unlike({
      id: postData.id,
      then: (res) => {
        setIsLiked(false);
        setNbLike(nbLike - 1);
      },
      error: (err) => console.error(err),
    });
  };
  const handleSave = () => {
    PostService.save({
      id: postData.id,
      then: (res) => setIsSaved(true),
      error: (err) => console.error(err),
    });
  };
  const handleUnsave = () => {
    PostService.unsave({
      id: postData.id,
      then: (res) => setIsSaved(false),
      error: (err) => console.error(err),
    });
  };
  const handleDelete = () => {
    PostService.remove({
      id: postData.id,
      then: (res) => setIsDeleted(true),
      error: (err) => console.error(err),
    });
  };

  return isDeleted ? (
    <></>
  ) : (
    <>
      <Grow in={true} key={postData.id}>
        <CardActionArea
          sx={{
            width: "100%",
            p: 3,
            bgcolor: "info.main",
            overflow: "hidden",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              fontStyle="italic"
              fontSize={18}
              fontWeight={200}
              color="primary"
            >
              by
            </Typography>
            <Typography
              fontStyle="italic"
              fontSize={22}
              fontWeight={400}
              color="primary"
            >
              {postData.author.name}
            </Typography>
          </Stack>
          <Typography fontSize={36} fontWeight={700} color="primary" mt={2}>
            {postData.title}
          </Typography>
          <Typography fontSize={20} color="primary" mt={3}>
            {postData.content}
          </Typography>
          <MediaPlayer postData={postData} />
          <Box mt={4} display="flex" flexDirection="row" alignItems="center">
            <Stack direction="row" spacing={0.5}>
              <Box display="flex" flexDirection="row" alignItems="center">
                {isLiked ? (
                  <IconButton
                    color="primary"
                    onClick={handleUnlike}
                    sx={{ mr: 0.5 }}
                  >
                    <FavoriteSharp />
                  </IconButton>
                ) : (
                  <IconButton color="primary" onClick={handleLike}>
                    <FavoriteBorderSharp />
                  </IconButton>
                )}
                <Typography
                  color="primary"
                  fontSize={17}
                  fontWeight={400}
                  marginRight={3}
                >
                  {nbLike}
                </Typography>
              </Box>
              <IconButton color="primary" onClick={() => setOpenComment(true)}>
                <ChatBubbleOutlineSharp />
              </IconButton>
              {isSaved ? (
                <IconButton color="primary" onClick={handleUnsave}>
                  <BookmarkSharp />
                </IconButton>
              ) : (
                <IconButton color="primary" onClick={handleSave}>
                  <BookmarkBorderSharp />
                </IconButton>
              )}
              {postData.authorId === user.id ? (
                <IconButton color="primary" onClick={handleDelete}>
                  <DeleteOutlineSharp />
                </IconButton>
              ) : null}
            </Stack>
            <Typography
              fontStyle="italic"
              fontSize={16}
              fontWeight={300}
              color="primary"
              ml="auto"
            >
              {postData.date}
            </Typography>
          </Box>
        </CardActionArea>
      </Grow>
      <CommentsModal
        post={postData}
        isOpen={openComment}
        setIsOpen={setOpenComment}
      />
    </>
  );
};

export default PostCard;

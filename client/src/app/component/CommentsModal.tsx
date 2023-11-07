import Box from "@mui/material/Box";
import { Comment, Post } from "@/types/models";
import {
  Backdrop,
  Button,
  CardActionArea,
  Collapse,
  Fade,
  Grow,
  IconButton,
  ImageList,
  ImageListItem,
  Modal,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import TextAreaCustomed from "./TextAreaCustomed";
import CommentService from "@/services/commentService";
import {
  BorderColorOutlined,
  BorderColorSharp,
  DeleteOutlineSharp,
  ReplySharp,
} from "@mui/icons-material";
import CommentCard from "./CommentCard";

const style: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: "85%",
  bgcolor: "secondary.main",
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export type CommentsModalProps = {
  post: Post;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const CommentsModal: React.FC<CommentsModalProps> = ({
  post,
  isOpen,
  setIsOpen,
}) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const handleAdd = () => {
    CommentService.create({
      body: {
        postId: post.id,
        content: newComment,
      },
      then: (res) => {
        setNewComment("");
        const user = localStorage.getItem("artx-user");
        const comment = {
          ...res.data.comment,
          author: JSON.parse(user ?? ""),
        };
        setComments([comment, ...comments]);
      },
      error: (err) => console.error(err),
    });
  };
  const handleDelete = (index: number) => {
    let updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };
  const handleEdit = (index: number, newValue: string) => {
    let updatedComment = [...comments];
    updatedComment[index].content = newValue;
    setComments(updatedComment);
  };

  useEffect(() => {
    if (isOpen) {
      CommentService.getPostComments({
        id: post.id,
        then: (res) => setComments(res.data),
        error: (err) => console.error(err),
      });
    }
  }, [isOpen]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <Typography fontSize={25} color="primary">
            Comment "{post.title}"
          </Typography>
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="end"
          >
            <TextAreaCustomed
              sx={{ mt: 3 }}
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
              ariaLabel="add a comment"
              minRows={1}
              maxRows={12}
              placeholder="Add a comment"
            />
            {newComment.length > 0 ? (
              <Stack direction="row" spacing={2} mt={1}>
                <Button variant="outlined" onClick={() => setNewComment("")}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleAdd}>
                  Add a comment
                </Button>
              </Stack>
            ) : null}
          </Box>
          <Box width="100%" height="100%" mt={2} sx={{ overflowY: "auto" }}>
            <ImageList variant="masonry" cols={1} gap={5}>
              {comments.map((item, index) => {
                return (
                  <CommentCard
                    key={item.id}
                    comment={item}
                    deleteCallback={handleDelete}
                    editCallback={handleEdit}
                    index={index}
                  />
                );
              })}
            </ImageList>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CommentsModal;

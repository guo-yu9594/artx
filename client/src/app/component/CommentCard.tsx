import Box from "@mui/material/Box";
import { Comment } from "@/types/models";
import {
  Button,
  CardActionArea,
  Grow,
  IconButton,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import TextAreaCustomed from "./TextAreaCustomed";
import {
  BorderColorSharp,
  DeleteOutlineSharp,
  KeyboardArrowDownSharp,
  KeyboardArrowUpSharp,
  QuestionAnswerSharp,
  ReplySharp,
} from "@mui/icons-material";
import { useState } from "react";
import CommentService from "@/services/commentService";

export type CommentCardProps = {
  comment: Comment;
  index: number;
  editCallback: (index: number, newValue: string) => void;
  deleteCallback: (index: number) => void;
};

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  index,
  editCallback,
  deleteCallback,
}) => {
  const [editInput, setEditInput] = useState("");
  const [repliesRetrieved, setRepliesRetrieved] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const [replies, setReplies] = useState<Comment[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const user = JSON.parse(localStorage.getItem("artx-user") ?? "");
  const handleReply = () => {
    CommentService.reply({
      body: {
        commentId: comment.id,
        content: replyInput,
      },
      then: (res) => {
        const reply = {
          ...res.data.content,
          author: user,
        };
        setReplies([reply, ...replies]);
        setReplyInput("");
        setReplyMode(false);
      },
      error: (err) => console.error(err),
    });
  };
  const retrieveReplies = () => {
    if (repliesRetrieved === false) {
      CommentService.getCommentReplies({
        id: comment.id,
        then: (res) => {
          setRepliesRetrieved(true);
          setReplies(res.data);
        },
        error: (err) => console.error(err),
      });
    }
  };
  const handleDelete = (index: number) => {
    CommentService.remove({
      id: comment.id,
      then: (_) => deleteCallback(index),
      error: (err) => console.error(err),
    });
  };
  const handleEdit = (index: number, newValue: string) => {
    CommentService.update({
      id: comment.id,
      body: {
        content: newValue,
      },
      then: (res) => {
        editCallback(index, newValue);
        setIsEdit(false);
      },
      error: (err) => console.error(err),
    });
  };
  const replyDeleteCallback = (index: number) => {
    let updatedReplies = [...replies];
    updatedReplies.splice(index, 1);
    setReplies(updatedReplies);
  };
  const replyEditCallback = (index: number, newValue: string) => {
    let updatedReplies = [...replies];
    updatedReplies[index].content = newValue;
    setReplies(updatedReplies);
  };

  return (
    <Grow in={true}>
      <ImageListItem>
        <CardActionArea
          disableRipple
          sx={{
            width: "100%",
            p: 2,
            bgcolor: "info.main",
            overflow: "hidden",
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                fontStyle="italic"
                fontSize={13}
                fontWeight={200}
                color="primary"
              >
                by
              </Typography>
              <Typography
                fontStyle="italic"
                fontSize={13}
                fontWeight={400}
                color="primary"
              >
                {comment.author?.name}
              </Typography>
            </Stack>
            {isEdit ? (
              <Box
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="end"
              >
                <TextAreaCustomed
                  sx={{ width: "100%" }}
                  minRows={1}
                  maxRows={3}
                  onChange={(e) => setEditInput(e.target.value)}
                  placeholder={comment.content as string}
                  value={editInput}
                />
                <Stack direction="row" mt={1} spacing={2}>
                  <Button onClick={() => setIsEdit(false)}>
                    <Typography fontSize={12}>Cancel</Typography>
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(index, editInput)}
                  >
                    <Typography fontSize={12}>Update</Typography>
                  </Button>
                </Stack>
              </Box>
            ) : (
              <Typography color="primary" fontWeight={400} fontSize={15}>
                {comment.content}
              </Typography>
            )}
            <Stack direction="row" alignItems="center">
              <IconButton
                color="primary"
                onClick={() => {
                  retrieveReplies();
                  setShowReplies(!showReplies);
                }}
              >
                <QuestionAnswerSharp fontSize="small" />
                {showReplies ? (
                  <KeyboardArrowUpSharp fontSize="small" />
                ) : (
                  <KeyboardArrowDownSharp fontSize="small" />
                )}
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => setReplyMode(!replyMode)}
              >
                <ReplySharp fontSize="small" />
              </IconButton>
              {comment.authorId === user.id ? (
                <>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setIsEdit(!isEdit);
                      setEditInput(comment.content ?? "");
                    }}
                  >
                    <BorderColorSharp fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteOutlineSharp fontSize="small" />
                  </IconButton>
                </>
              ) : null}
              <Typography
                fontStyle="italic"
                fontSize={14}
                fontWeight={300}
                color="primary"
                ml="auto"
              >
                {comment.date}
              </Typography>
            </Stack>
          </Stack>
        </CardActionArea>
        {replyMode ? (
          <Stack spacing={1} width="95%" ml="auto" mt={0.5}>
            <Stack
              width="100%"
              p={2}
              bgcolor="info.main"
              alignItems="end"
              spacing={1.5}
            >
              <TextAreaCustomed
                sx={{ width: "100%" }}
                minRows={1}
                maxRows={3}
                onChange={(e) => setReplyInput(e.target.value)}
                placeholder="Add a reply..."
                value={replyInput}
              />
              <Stack direction="row" spacing={1}>
                <Button variant="text" onClick={() => setReplyMode(false)}>
                  <Typography fontSize={12}>Cancel</Typography>
                </Button>
                <Button variant="contained" onClick={handleReply}>
                  <Typography fontSize={12}>Reply</Typography>
                </Button>
              </Stack>
            </Stack>
          </Stack>
        ) : null}
        {showReplies ? (
          <Stack spacing={0.05} width="95%" ml="auto" mt={0.5}>
            {replies.length <= 0 ? (
              <Typography fontSize={12} fontWeight={300}>
                No reply
              </Typography>
            ) : (
              replies.map((reply, index) => {
                return (
                  <CommentCard
                    comment={reply}
                    index={index}
                    deleteCallback={replyDeleteCallback}
                    editCallback={replyEditCallback}
                    key={reply.id}
                  />
                );
              })
            )}
          </Stack>
        ) : null}
      </ImageListItem>
    </Grow>
  );
};

export default CommentCard;

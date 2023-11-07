"use client";

import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  SxProps,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PostService from "@/services/postService";
import FileUploadButton from "./FileUploadButton";
import Cookies from "js-cookie";
import TextAreaCustomed from "./TextAreaCustomed";

const style: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  minHeight: "400px",
  bgcolor: "info.main",
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const NewPostButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null | undefined>(undefined);
  const handleCreate = () => {
    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("content", content);
    formData.append("title", title);
    PostService.create({
      body: formData,
      config: {
        headers: {
          Authorization: Cookies.get("artx-token"),
          "Content-Type": "multipart/form-data",
        },
      },
      then: (res) => {
        setIsOpen(false);
        location.reload();
      },
      error: (err) => console.error(err),
    });
  };

  return (
    <>
      <Button
        sx={{
          py: 1,
          mt: 3,
          color: "secondary.main",
          fontSize: 18,
          fontWeight: 400,
          width: "40%",
        }}
        variant="contained"
        onClick={() => setIsOpen(true)}
        fullWidth
      >
        + New Post
      </Button>
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
            <Typography
              color="primary"
              fontSize={25}
              fontWeight={700}
              textTransform="uppercase"
              paddingBottom={5}
            >
              New post
            </Typography>
            <TextAreaCustomed
              onChange={(e) => setTitle(e.target.value)}
              ariaLabel="minimum height"
              minRows={1}
              maxRows={2}
              placeholder="Title"
            />
            <TextAreaCustomed
              sx={{ mt: 0.5 }}
              onChange={(e) => setContent(e.target.value)}
              ariaLabel="minimum height"
              minRows={5}
              maxRows={12}
              placeholder="Write something..."
            />
            <FileUploadButton onFileSelect={(file) => setFile(file)} />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 4 }}
              onClick={handleCreate}
            >
              <Typography color="secondary">Post</Typography>
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default NewPostButton;

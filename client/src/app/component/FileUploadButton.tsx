import { ChangeEvent, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type FileUploadButtonProps = {
  onFileSelect: (file: File | null | undefined) => void;
};

function FileUploadButton({ onFileSelect }: FileUploadButtonProps) {
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };
  const handleRemoveFile = () => {
    setFileName(undefined);
    onFileSelect(null);
  };

  return (
    <>
      {!fileName ? (
        <Box m={2}>
          <input
            type="file"
            id="file-input"
            accept=".jpeg, .jpg, .png, .gif, .mp4, .mp3"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
          <label htmlFor="file-input">
            <Button
              variant="contained"
              color="secondary"
              component="span"
              sx={{ boxShadow: "none" }} 
              startIcon={<CloudUploadIcon color="primary" />}
            >
              <Typography color="primary">Upload file</Typography>
            </Button>
          </label>
        </Box>
      ) : (
        <Box
          m={2}
          width="100%"
          height="fit-content"
          p={2}
          bgcolor="secondary.main"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography color="primary">{fileName}</Typography>
          <Button variant="outlined" color="primary" onClick={handleRemoveFile}>
            Remove
          </Button>
        </Box>
      )}
    </>
  );
}

export default FileUploadButton;

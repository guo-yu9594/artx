"use client";

import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import appTheme from "@/components/ThemeRegistry/theme";
import { SxProps } from "@mui/material";

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    width: 100%;
    font-family: __BioRhyme_3747cc;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5;
    padding: 12px;
    color: ${appTheme.palette.primary.main};
    background: ${appTheme.palette.secondary.main};
    border: 0;

    &:hover {
      border-color: ${appTheme.palette.primary.main};
    }

    &:focus {
      border-color: ${appTheme.palette.primary.main};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

export type TextAreaCustomedProps = {
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  ariaLabel?: string;
  sx?: SxProps;
};

const TextAreaCustomed: React.FC<TextAreaCustomedProps> = ({
  onChange,
  placeholder,
  minRows,
  maxRows,
  ariaLabel,
  sx,
  value
}) => {
  return (
    <Textarea
      sx={sx}
      onChange={onChange}
      aria-label={ariaLabel}
      value={value}
      minRows={minRows}
      maxRows={maxRows}
      placeholder={placeholder}
    />
  );
};

export default TextAreaCustomed;

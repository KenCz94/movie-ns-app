import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import { RateReview as CommentIcon } from "@material-ui/icons";
import styled from "styled-components/macro";

const DialogIconStar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
`;

const DialogCommentTextField = styled(TextField)`
  margin-top: ${(props) => props.theme.spacing(6)}px;
`;

const DialogIcon = styled(CommentIcon)`
  width: 4rem;
  height: 4rem;
  color: ${(props) => props.theme.palette.primary.main};
`;

const DialogCommentTitle = styled(MuiDialogTitle)`
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: bold;
  font-size: 0.8rem;
  text-align: center;
`;

const DialogCommentMovie = styled(DialogContentText)`
  font-weight: 400;
  font-size: 1rem;
  text-align: center;
  color: #000;
  margin: 0;
`;

const DialogContent = styled(MuiDialogContent)`
  margin: ${(props) => props.theme.spacing(4)}px
    ${(props) => props.theme.spacing(8)}px;
`;

const DialogCommentButton = styled(Button)`
  margin-top: ${(props) => props.theme.spacing(6)}px;
  text-transform: uppercase;
`;

const DialogComment = ({
  movieTitle,
  open,
  commentValue,
  onComment,
  onClose,
}) => {
  const [comment, setComment] = useState(commentValue ? commentValue : "");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleComment = () => {
    onComment(comment);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="comment-dialog-title"
      aria-describedby="comment-dialog-description"
      maxWidth="lg"
    >
      <DialogCommentTitle id="comment-dialog-title">
        {comment ? "Edit comment" : "Add comment"}
      </DialogCommentTitle>
      <DialogContent dividers>
        <DialogIconStar>
          <DialogIcon />
        </DialogIconStar>

        <DialogCommentMovie id="comment-dialog-description">
          {movieTitle}
        </DialogCommentMovie>
        <DialogCommentTextField
          label="Comment"
          onChange={handleCommentChange}
          value={comment}
          fullWidth
          multiline
          rows={4}
        />
        <DialogCommentButton
          onClick={handleComment}
          color="primary"
          variant="contained"
          fullWidth
        >
          Save
        </DialogCommentButton>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComment;

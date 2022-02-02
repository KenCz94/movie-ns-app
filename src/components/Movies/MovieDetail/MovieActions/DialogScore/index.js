import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogContentText,
} from "@material-ui/core";
import { Rating as Score } from "@material-ui/lab";
import styled from "styled-components/macro";
import { Star as StarIcon } from "@material-ui/icons";

const DialogCommentTitle = styled(MuiDialogTitle)`
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: bold;
  font-size: 0.8rem;
  text-align: center;
`;

const DialogIconStar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
`;

const DialogStar = styled(StarIcon)`
  width: 4rem;
  height: 4rem;
  color: ${(props) => props.theme.palette.primary.main};
`;

const DialogScoreMovie = styled(DialogContentText)`
  font-weight: 400;
  font-size: 1.5rem;
  text-align: center;
  color: #000;
  margin: 0;
`;

const ScoreContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

const DialogContent = styled(MuiDialogContent)`
  margin: ${(props) => props.theme.spacing(8)}px
    ${(props) => props.theme.spacing(12)}px;
`;

const DialogScoreButton = styled(Button)`
  margin-top: ${(props) => props.theme.spacing(6)}px;
  text-transform: uppercase;
`;

const DialogScore = ({
  movieTitle,
  open,
  scoreValue,
  onChangeScore,
  onClose,
}) => {
  const [score, setScore] = useState(scoreValue ? scoreValue : 0);

  const handleScoreChange = (score) => {
    setScore(score);
  };

  const handleScore = () => {
    onChangeScore(score);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogCommentTitle id="comment-dialog-title">
        {scoreValue ? "Edit score" : "Add score"}
      </DialogCommentTitle>
      <DialogContent dividers>
        <DialogIconStar>
          <DialogStar />
        </DialogIconStar>

        <DialogScoreMovie>{movieTitle}</DialogScoreMovie>
        <ScoreContainer>
          <Score
            name="score-movie"
            size="large"
            value={score}
            onChange={(event, scoreValue) => {
              handleScoreChange(scoreValue);
            }}
          />
        </ScoreContainer>

        <DialogScoreButton
          color="primary"
          variant="contained"
          fullWidth
          onClick={handleScore}
        >
          Rate
        </DialogScoreButton>
      </DialogContent>
    </Dialog>
  );
};

export default DialogScore;

import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import styled from "styled-components/macro";
import {
  Star as StarScoreIcon,
  RateReview as CommentIcon,
  ExitToApp as ExitLinkIcon,
} from "@material-ui/icons";

import DialogScore from "./DialogScore";
import DialogComment from "./DialogComment";

const ButtonActionsContainer = styled(Grid)`
  padding: ${(props) => props.theme.spacing(4)}px;
`;

const ButtonAction = styled(Button)`
  margin: ${(props) => props.theme.spacing(2)}px;
  text-transform: uppercase;
`;

const MovieActions = ({
  data,
  userScore,
  onChangeScore,
  onRefresh,
  existInWatchList,
  onChangeWatchList,
}) => {
  const [openScoreDialog, setOpenScoreDialog] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);

  const handleScore = (score) => {
    onChangeScore(score, null, onRefresh);
    setOpenScoreDialog(false);
  };

  const handleComment = (comment) => {
    onChangeScore(null, comment);
    setOpenCommentDialog(false);
  };

  const handleOpenScoreDialog = () => {
    setOpenScoreDialog(true);
  };

  const handleOpenCommentDialog = () => {
    setOpenCommentDialog(true);
  };

  const handleCloseScoreDialog = () => {
    setOpenScoreDialog(false);
  };

  const handleCloseCommentDialog = () => {
    setOpenCommentDialog(false);
  };

  const { title, fandango_url: imdb } = data;
  const existScore = !!userScore && !!userScore.score;
  const existComment = !!userScore && !!userScore.comment;

  return (
    <>
      <ButtonActionsContainer
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        item
        xs={12}
        sm={12}
        md={12}
        lg={10}
        xl={10}
      >
        <ButtonAction
          variant={"contained"}
          color="primary"
          fullWidth
          onClick={handleOpenScoreDialog}
          startIcon={<StarScoreIcon />}
        >
          {existScore ? "Edit score" : "Rate"}
        </ButtonAction>
        <ButtonAction
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleOpenCommentDialog}
          startIcon={<CommentIcon />}
        >
          {existComment ? "Edit comment" : "Comment"}
        </ButtonAction>

        <ButtonAction
          variant="outlined"
          color="primary"
          fullWidth
          component="a"
          href={imdb}
          target="_blank"
          startIcon={<ExitLinkIcon />}
        >
          Go to Fandango
        </ButtonAction>
      </ButtonActionsContainer>

      <DialogScore
        movieTitle={title}
        open={openScoreDialog}
        scoreValue={userScore ? userScore.score : 0}
        onChangeScore={handleScore}
        onClose={handleCloseScoreDialog}
      />
      <DialogComment
        movieTitle={title}
        open={openCommentDialog}
        commentValue={userScore ? userScore.comment : ""}
        onComment={handleComment}
        onClose={handleCloseCommentDialog}
      />
    </>
  );
};

export default MovieActions;

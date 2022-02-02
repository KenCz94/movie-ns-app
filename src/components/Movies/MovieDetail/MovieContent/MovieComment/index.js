import React from "react";
import styled from "styled-components/macro";
import { Avatar, Typography, Grid } from "@material-ui/core";
import { parseJSON, formatDistanceToNow } from "date-fns";
import { spacing } from "@material-ui/system";
import { Star } from "@material-ui/icons";
import "./index.scss";

const UserAvatar = styled(Avatar)`
  margin: ${(props) => props.theme.spacing(2)}px;
  text-transform: uppercase;
`;

const MovieScoreInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  color: #f39c12;
`;

const ScoreLabel = styled(Typography)(spacing);

const StarIcon = styled(Star)`
  color: #f39c12;
  margin-right: 6px;
`;

const CommentTitle = styled(Typography)`
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.5em;
  padding-bottom: 15px;
  position: relative;

  :before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 5px;
    width: 55px;
    background-color: ${(props) => props.theme.palette.primary.main};
  }

  :after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 2px;
    height: 1px;
    width: 100%;
    background-color: ${(props) => props.theme.palette.primary.main};
  }
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
`;

const MovieComment = ({ data }) => {
  if (!data || data.filter(({ comment }) => !!comment).length === 0)
    return null;

  const comments = data.filter(({ comment }) => !!comment);

  return (
    <>
      <div className="comments-container">
        <CommentTitle variant="h3" color="primary">
          Comments
        </CommentTitle>

        <ul id="comments-list" className="comments-list">
          {comments.map(
            ({ id, score, comment, user, create_date: createdAt }) => (
              <li key={id}>
                <div className="comment-main-level">
                  <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="stretch"
                  >
                    <Grid
                      container
                      justifyContent={"flex-start"}
                      item
                      xs={3}
                      sm={2}
                      md={6}
                      lg={6}
                      xl={1}
                      style={{ marginRight: "1.5rem" }}
                    >
                      <div className="comment-avatar">
                        <UserAvatar>{user[0]}</UserAvatar>
                      </div>
                    </Grid>
                    <Grid container justifyContent={"flex-start"} item xs>
                      <div className="comment-box">
                        <Grid
                          className="comment-head"
                          container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid
                            container
                            item
                            alignItems="center"
                            justifyContent="flex-start"
                            xs={8}
                          >
                            <h6 className="comment-name by-author">{user}</h6>
                            <span>
                              {formatDistanceToNow(parseJSON(createdAt), {
                                addSuffix: true,
                              })}
                            </span>
                          </Grid>

                          <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-end"
                            item
                            xs={4}
                          >
                            <MovieScoreInfo>
                              <StarIcon size={25} />

                              <ScoreLabel mr={1} variant="h3" component="span">
                                {score ? score : "?"}
                              </ScoreLabel>
                              <ScoreLabel variant="subtitle1" component="span">
                                / 5
                              </ScoreLabel>
                            </MovieScoreInfo>
                          </Grid>
                        </Grid>
                        <div className="comment-content">{comment}</div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
};

export default MovieComment;

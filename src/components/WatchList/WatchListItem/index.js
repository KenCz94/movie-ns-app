import React from "react";
import styled from "styled-components/macro";
import { Chip as MuiChip, Button, Typography } from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../../../vendor/perfect-scrollbar.css";
import {
  Star as StarIcon,
  RemoveOutlined as RemoveOutlinedIcon,
} from "@material-ui/icons";
import "./index.scss";

const ScoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  float: right;
`;

const ScoreIcon = styled(StarIcon)`
  color: #f39c12;
  width: 20px;
  height: 20px;
  margin: 0;
`;

const Chip = styled(MuiChip)`
  margin: ${(props) => props.theme.spacing(1)}px;
  color: white;
  border: 1px solid white;
  background-color: ${(props) => props.theme.palette.primary.main};
`;

const GenreChip = styled(PerfectScrollbar)`
  font-size: 0.6rem;
  overflow: x-scroll;
  white-space: nowrap;
  padding: ${(props) => props.theme.spacing(2)}px 0;
  width: 100%;
  margin-bottom: 2em;
`;

const WatchListContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(2)}px 0;
  width: 100%;
`;

const ButtonActionWatchList = styled(Button)`
  margin: ${(props) => props.theme.spacing(2)}px;
  text-transform: uppercase;
  background-color: #f39c12;
  color: white;

  :hover {
    background-color: #d68910;
  }
`;

const WatchListItem = ({ data, onRemove, id }) => {
  const {
    title,
    produced_by,
    description,
    genre,
    release_date,
    poster_url: poster,
    score_avg,
  } = data;

  return (
    <div className="movie-item card">
      <div
        className="wrapper"
        style={{
          backgroundImage: `url(${poster})`,
          backgroundPosition: "center",
          backgroundSize: "100% 30em",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="header">
          <div className="date">
            <Typography className="year">{release_date}</Typography>
          </div>
          {!!score_avg && (
            <ScoreContainer>
              <ScoreIcon /> {score_avg} / 5
            </ScoreContainer>
          )}
        </div>
        <div className="data">
          <div className="content">
            <span className="produced-by">{produced_by}</span>
            <Typography variant="h1" className="title">
              {title}
            </Typography>
            <GenreChip>
              {genre.map((item, index) => (
                <Chip
                  key={index}
                  size={"small"}
                  label={item}
                  variant="outlined"
                />
              ))}
            </GenreChip>
            <p className="text">{description}</p>
            <WatchListContainer>
              <ButtonActionWatchList
                variant="contained"
                fullWidth
                startIcon={<RemoveOutlinedIcon />}
                onClick={() => onRemove(id)}
              >
                Remove from Watchlist
              </ButtonActionWatchList>
            </WatchListContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchListItem;

import {
  useMediaQuery,
  Chip as MuiChip,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import styled from "styled-components/macro";

import MovieActions from "../MovieActions";
import MovieComment from "./MovieComment";
import MovieScore from "./MovieScore";
import "./index.scss";
import {
  AddToQueue as AddToQueueIcon,
  RemoveOutlined as RemoveOutlinedIcon,
} from "@material-ui/icons";

const MovieSubHeader = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  width: 100%;
  margin-top: ${(props) => props.theme.spacing(2)}px;
  gap: ${(props) => props.theme.spacing(2)}px;
`;

const MovieDescription = styled(Typography)`
  text-align: justify;
  font-size: 1rem;
  margin: ${(props) => props.theme.spacing(2)}px 0;
`;

const Genre = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.6rem;
  white-space: nowrap;
  padding: ${(props) => props.theme.spacing(2)}px 0;
  width: 100%;
`;

const ScoreContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(2)}px 0;
  width: 100%;
`;

const Chip = styled(MuiChip)`
  margin: ${(props) => props.theme.spacing(1)}px;
`;

const WatchListContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(2)}px 0;
  width: 30%;
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

const MovieContent = ({
  data,
  userScore,
  scores,
  onChangeScore,
  onRefresh,
  onChangeWatchList,
  existInWatchList,
}) => {
  const { title, release_date, genre, description, poster_url: poster } = data;
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <>
      <div className="movie-card">
        <div className="movie-card__wrp swiper-wrapper">
          <div className="movie-card__item swiper-slide">
            <div className="movie-card__img">
              <img src={poster} alt="" />
            </div>
            <div className="movie-card__content">
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="h1"
                  gutterBottom
                  display="inline"
                  color="primary"
                >
                  {title}
                </Typography>

                <MovieSubHeader>
                  <Typography variant="h5">{release_date}</Typography>
                </MovieSubHeader>

                <Genre>
                  {genre.map((item, index) => (
                    <Chip
                      key={index}
                      label={item}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Genre>
                <MovieDescription variant="body1">
                  {description}
                </MovieDescription>

                <ScoreContainer>
                  <MovieScore
                    data={data}
                    userScore={userScore ? userScore.score : null}
                  />
                </ScoreContainer>
                <WatchListContainer>
                  <ButtonActionWatchList
                    variant="contained"
                    fullWidth
                    startIcon={
                      existInWatchList ? (
                        <RemoveOutlinedIcon />
                      ) : (
                        <AddToQueueIcon />
                      )
                    }
                    onClick={onChangeWatchList}
                  >
                    {existInWatchList
                      ? "Remove from Watchlist"
                      : "Add to Watchlist"}
                  </ButtonActionWatchList>
                </WatchListContainer>
              </Grid>
            </div>
          </div>
        </div>
      </div>

      <Grid container justifyContent="flex-start" alignItems="stretch">
        <Grid
          container
          justifyContent={isXs ? "center" : "flex-start"}
          item
          xs={12}
          sm={8}
          md={6}
          lg={6}
          xl={9}
        >
          <MovieComment data={scores} />
        </Grid>
        <Grid
          container
          justifyContent={isXs ? "center" : "flex-end"}
          item
          xs={12}
          sm={4}
          md={6}
          lg={6}
          xl={3}
        >
          <MovieActions
            data={data}
            userScore={userScore}
            onChangeScore={onChangeScore}
            onRefresh={onRefresh}
            existInWatchList={existInWatchList}
            onChangeWatchList={onChangeWatchList}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MovieContent;

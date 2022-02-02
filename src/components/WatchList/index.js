import { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import styled, { createGlobalStyle } from "styled-components/macro";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import WatchListItem from "./WatchListItem";

import useWatchList from "../../hooks/useWatchList";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }
  body {
    background: ${(props) => props.theme.palette.background.default};
  }
`;

const Root = styled.div`
  max-width: 600px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
`;

const IconContainer = styled.div`
  display: "flex";
  align-items: "center";
`;

const RecordsNotFoundIcon = styled(ErrorOutlineIcon)`
  font-size: 100px;
  color: #f39c12;
`;

const WatchList = () => {
  const classes = useStyles();
  const { watchList, loadWatchList, removeWatchList } = useWatchList();

  useEffect(() => {
    loadWatchList();
  }, [loadWatchList]);

  return watchList && watchList.length > 0 ? (
    <Grid container justifyContent="flex-start">
      {watchList.map(({ id, movie_info: movie }, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <WatchListItem
            key={index}
            id={id}
            data={movie}
            onRemove={removeWatchList}
          />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <div className={classes.paper}>
        <IconContainer>
          <RecordsNotFoundIcon />
        </IconContainer>
        <Typography variant="h1">
          Movies on watchlist not found or loading
        </Typography>
      </div>
    </Root>
  );
};

export default WatchList;

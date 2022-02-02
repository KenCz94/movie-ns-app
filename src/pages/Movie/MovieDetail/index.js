import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import MovieContent from "../../../components/Movies/MovieDetail/MovieContent";

import useMovies from "../../../hooks/useMovies";
import useScore from "../../../hooks/useScore";
import useWatchList from "../../../hooks/useWatchList";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState();
  const [userWatchListId, setUserWatchListId] = useState(null);
  const { getMovieDetail } = useMovies(null);
  const { scores, userScore, handleScore } = useScore(movieId);
  const { findWatchListMovie, addWatchList, removeWatchList } = useWatchList();

  const refreshMovieDetail = useCallback(async () => {
    try {
      const movie = await getMovieDetail(movieId);
      setMovieData(movie);
    } catch (error) {
      console.error(error);
    }
  }, [getMovieDetail, movieId]);

  useEffect(() => {
    refreshMovieDetail();
  }, [refreshMovieDetail]);

  const findMovieInWatchList = useCallback(async () => {
    try {
      const response = await findWatchListMovie(movieId);
      if (response) {
        setUserWatchListId(response.id);
      } else {
        setUserWatchListId(null);
      }
    } catch (error) {
      console.error(error);
    }
  }, [findWatchListMovie, movieId]);

  useEffect(() => {
    findMovieInWatchList();
  }, [findMovieInWatchList]);

  const handleWatchList = useCallback(async () => {
    if (userWatchListId) {
      await removeWatchList(userWatchListId);
    } else {
      await addWatchList(movieId);
    }
    await findMovieInWatchList();
  }, [
    userWatchListId,
    addWatchList,
    removeWatchList,
    movieId,
    findMovieInWatchList,
  ]);

  const existInWatchList = !!userWatchListId;

  return (
    <>
      <Helmet title="Movie Detail" />
      {movieData && (
        <MovieContent
          data={movieData}
          userScore={userScore}
          scores={scores}
          onChangeScore={handleScore}
          onRefresh={refreshMovieDetail}
          onChangeWatchList={handleWatchList}
          existInWatchList={existInWatchList}
        />
      )}
    </>
  );
};

export default MovieDetail;

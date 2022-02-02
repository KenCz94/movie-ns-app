import { useState } from "react";
import { Divider as MuiDivider } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";

import MovieSort from "../../components/Movies/MovieSort";
import MovieList from "../../components/Movies/MovieList";

import useMovies from "../../hooks/useMovies";

const Divider = styled(MuiDivider)(spacing);

const Movie = () => {
  const [orderFilters, setOrderFilters] = useState();
  const { movies, handleLoadMore, dataCount } = useMovies(orderFilters);

  const handleFilter = (orderFilters) => {
    setOrderFilters(orderFilters);
  };

  return (
    <>
      <Helmet title="Movies" />
      <MovieSort onFilter={handleFilter} />

      <Divider my={6} />
      <MovieList
        data={movies}
        onFetchMore={handleLoadMore}
        dataLength={dataCount}
      />
    </>
  );
};

export default Movie;

import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import * as type from "../../constants";
import {
  getMovies as getMoviesService,
  getMovieDetail as getMovieDetailService,
  addMovie as addMovieService,
  updateMovie as updateMovieService,
  deleteMovie as deleteMovieService,
} from "../../services/moviesService";

const START_PAGE = 1;
const LIMIT_PER_PAGE = 5;

const useMovies = (orderFilter) => {
  const { enqueueSnackbar } = useSnackbar();
  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState({
    page: START_PAGE,
    limit: LIMIT_PER_PAGE,
  });
  const [nextPage, setNextPage] = useState(null);
  const [dataCount, setDataCount] = useState(0);
  const user = useSelector((state) => state.authReducer.user);

  const loadMovieData = useCallback(
    async (isDelete = false) => {
      setMovies([]);
      const { page, limit } = pagination;
      if (isDelete && page !== 1) {
        const isEmpty = page >= Math.ceil((dataCount - 1) / limit);
        setPagination({
          limit,
          page: isEmpty ? page - 1 : page,
        });
        return;
      }

      try {
        const { count, next, results } = await getMoviesService(pagination, {
          ordering: orderFilter,
        });
        setMovies(results);
        setDataCount(count);
        setNextPage(next);
      } catch (error) {
        console.error(error);
        enqueueSnackbar(type.GET_MOVIES_SORRY, {
          variant: type.ERROR,
        });
      }
    },
    [pagination, orderFilter, enqueueSnackbar, dataCount]
  );

  useEffect(() => {
    loadMovieData();
  }, [loadMovieData]);

  const handleShowMore = useCallback(async () => {
    if (nextPage) {
      try {
        const { count, next, results } = await getMoviesService(
          null,
          null,
          nextPage
        );
        setMovies((prevState) => [...prevState, ...results]);
        setDataCount(count);
        setNextPage(next);
      } catch (error) {
        console.error(error);
        enqueueSnackbar(type.GET_MOVIES_SORRY, {
          variant: type.ERROR,
        });
      }
    }
  }, [nextPage, enqueueSnackbar]);

  const getMovieDetail = useCallback(
    async (movieId) => {
      try {
        return await getMovieDetailService(movieId);
      } catch (error) {
        console.error(error);
        enqueueSnackbar(type.GET_MOVIES_SORRY, {
          variant: type.ERROR,
        });
      }
    },
    [enqueueSnackbar]
  );

  const createMovie = useCallback(
    async (data) => {
      try {
        const { name: username } = user;
        await addMovieService({ ...data, created_by: username });
        await loadMovieData();
        enqueueSnackbar(type.CREATED_MOVIES_SUCCESS, {
          variant: type.SUCCESS,
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar(type.CREATED_MOVIES_SORRY, {
          variant: type.ERROR,
        });
      }
    },
    [enqueueSnackbar, loadMovieData, user]
  );

  const updateMovie = useCallback(
    async (id, data) => {
      try {
        const { name: username } = user;
        await updateMovieService(id, { ...data, created_by: username });
        await loadMovieData();
        enqueueSnackbar(type.UPDATED_MOVIES_SUCCESS, {
          variant: type.SUCCESS,
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar(type.UPDATED_MOVIES_SORRY, {
          variant: type.ERROR,
        });
      }
    },
    [enqueueSnackbar, loadMovieData, user]
  );

  const deleteMovie = useCallback(
    async (id) => {
      try {
        await deleteMovieService(id);
        await loadMovieData(true);
        enqueueSnackbar(type.DELETED_MOVIES_SUCCESS, {
          variant: type.SUCCESS,
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar(type.DELETED_MOVIES_SORRY, {
          variant: type.ERROR,
        });
      }
    },
    [enqueueSnackbar, loadMovieData]
  );

  const handlePagination = useCallback((pagination) => {
    setPagination((prevState) => ({ ...prevState, ...pagination }));
  }, []);

  return {
    movies,
    getMovieDetail,
    createMovie,
    updateMovie,
    deleteMovie,
    handleShowMore,
    handlePagination,
    dataCount,
    pagination,
  };
};

export default useMovies;

import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import * as type from "../../constants";
import {
  getScores as getScoresService,
  addScore as addScoreService,
  updateScore as updateScoreService,
  deleteScore as deleteScoreService,
} from "../../services/scoreService";

const useScore = (movieId) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [scores, setScores] = useState([]);
  const [userScore, setUserScore] = useState(null);
  const user = useSelector((state) => state.authReducer.user);

  const loadScores = useCallback(async () => {
    setScores([]);
    try {
      const response = await getScoresService({ movie: movieId });
      setScores(response);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(type.SCORE_SORRY, {
        variant: type.ERROR,
      });
    }
  }, [movieId, enqueueSnackbar]);

  useEffect(() => {
    loadScores();
  }, [loadScores]);

  useEffect(() => {
    const fetchData = async () => {
      setUserScore(null);
      try {
        const response = await getScoresService({
          movie: movieId,
          user: user.name,
        });
        if (response.length > 0) {
          setUserScore(response[0]);
        }
      } catch (error) {
        console.error(error);
        enqueueSnackbar(type.SCORE_SORRY, {
          variant: type.ERROR,
        });
      }
    };

    if (user) {
      fetchData();
    }
  }, [enqueueSnackbar, movieId, user]);

  const handleScore = useCallback(
    async (score, comment, refreshFunc = null) => {
      if (user) {
        try {
          let newUserScore = userScore;
          let newValues = {};
          let successMessage = "Thanks for your Score!";

          if (score) {
            newValues = { ...newValues, score: score };
            successMessage = type.SCORE_ADD;
          }
          if (comment) {
            newValues = { ...newValues, comment: comment };
            successMessage = type.COMMENT_ADD;
          }

          if (userScore) {
            const { id, ...request } = userScore;

            newUserScore = await updateScoreService(id, {
              ...request,
              ...newValues,
            });
          } else {
            newUserScore = await addScoreService({
              movie: movieId,
              user: user.name,
              ...newValues,
            });
          }
          setUserScore(newUserScore);
          loadScores();

          if (refreshFunc) refreshFunc();

          enqueueSnackbar(successMessage, {
            variant: type.SUCCESS,
          });
        } catch (error) {
          console.error(error);
          enqueueSnackbar(type.SCORE_SORRY, {
            variant: type.ERROR,
          });
        }
      } else {
        history.push("/auth/sign-in");
      }
    },
    [userScore, loadScores, enqueueSnackbar, movieId, user, history]
  );

  const deleteScore = useCallback(
    async (id) => {
      try {
        await deleteScoreService(id);
        await loadScores();
        enqueueSnackbar(type.DELETE_SCORE_SUCCESS, {
          variant: type.SUCCESS,
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar(type.DELETE_SCORE_SORRY, {
          variant: type.ERROR,
        });
      }
    },
    [enqueueSnackbar, loadScores]
  );

  return {
    scores,
    userScore,
    handleScore,
    deleteScore,
  };
};

export default useScore;

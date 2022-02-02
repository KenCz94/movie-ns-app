import axios from "../utils/moviesAxios";

const scoreEndpoint = process.env.REACT_APP_API_SCORE_ENDPOINT;

export const getScores = (filters) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${scoreEndpoint}`, {
        params: filters,
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addScore = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${scoreEndpoint}`, data)
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateScore = (id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${scoreEndpoint}${id}/`, data)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteScore = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${scoreEndpoint}${id}/`)
      .then((response) => {
        if (response.status === 204) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

import axios from "axios";

const { REACT_APP_API_BASE_URL } = process.env;

const moviesAxios = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
});

export default moviesAxios;

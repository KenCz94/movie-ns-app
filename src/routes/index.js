import React from "react";

import async from "../components/Async";

import {
  LiveTv as MovieIcon,
  StarHalf as ScoreIcon,
  AddToQueue as WatchListIcon,
} from "@material-ui/icons";

import AuthGuard from "../guards/AuthGuard";

import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ConfirmSignUp from "../pages/auth/ConfirmSignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import ConfirmResetPassword from "../pages/auth/ConfirmResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

const Movie = async(() => import("../pages/Movie"));
const MovieDetail = async(() => import("../pages/Movie/MovieDetail"));
const WatchList = async(() => import("../pages/WatchList"));
const AdminMovie = async(() => import("../pages/admin/Movie"));
const AdminScore = async(() => import("../pages/admin/Score"));

const moviesRoutes = {
  id: "Movies",
  path: "/",
  icon: <MovieIcon />,
  children: null,
  containsHome: true,
  component: Movie,
};

const movieActionRoutes = {
  id: "Movies",
  path: "/movies",
  children: [
    {
      path: "/movies/:movieId",
      component: MovieDetail,
    },
  ],
  containsHome: true,
  component: Movie,
};

const watchListRoutes = {
  id: "WatchList",
  path: "/watchlist",
  icon: <WatchListIcon />,
  children: null,
  containsHome: false,
  component: WatchList,
  guard: AuthGuard,
};

const adminMovieRoutes = {
  id: "Movies",
  path: "/admin/movies",
  header: "Administration",
  icon: <MovieIcon />,
  containsHome: false,
  component: AdminMovie,
  guard: AuthGuard,
};

const adminScoreRoutes = {
  id: "Score",
  path: "/admin/score",
  icon: <ScoreIcon />,
  containsHome: false,
  component: AdminScore,
  guard: AuthGuard,
};

const authRoutes = {
  id: "Auth",
  path: "/auth",
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn,
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp,
    },
    {
      path: "/auth/confirm-sign-up/:signUpUsername",
      name: "Confirm Sign Up",
      component: ConfirmSignUp,
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    {
      path: "/auth/confirm-reset-password/:resetPasswordUsername",
      name: "Confirm password",
      component: ConfirmResetPassword,
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
  component: null,
};

export const mainLayoutRoutes = [
  moviesRoutes,
  movieActionRoutes,
  adminMovieRoutes,
  adminScoreRoutes,
  watchListRoutes,
];

export const sidebarRoutes = [adminMovieRoutes, adminScoreRoutes];

export const authLayoutRoutes = [authRoutes];

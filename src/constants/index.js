import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
// THEME
export const THEME_SET = "THEME_SET";
export const THEMES = {
  DEFAULT: "DEFAULT",
  DARK: "DARK",
  LIGHT: "LIGHT",
  BLUE: "BLUE",
  GREEN: "GREEN",
  INDIGO: "INDIGO",
};

// CONTROL MESSAGES
export const SUCCESS = "success";
export const ERROR = "error";
export const WARNING = "warning";

// AUTH
export const AUTH_SIGN_IN_REQUEST = "AUTH_SIGN_IN_REQUEST";
export const AUTH_SIGN_IN_SUCCESS = "AUTH_SIGN_IN_SUCCESS";
export const AUTH_SIGN_IN_FAILURE = "AUTH_SIGN_IN_FAILURE";
export const AUTH_SIGN_OUT = "AUTH_SIGN_OUT";
export const AUTH_GET_CURRENT_AUTHENTICATED_USER =
  "AUTH_GET_CURRENT_AUTHENTICATED_USER";

// MOVIES MESSAGES
export const GET_MOVIES_SORRY =
  "Sorry, something went wrong getting the movies information";
export const CREATED_MOVIES_SORRY =
  "Sorry, something went wrong creating the movie information";
export const UPDATED_MOVIES_SORRY =
  "Sorry, something went wrong saving the movie information";
export const DELETED_MOVIES_SORRY =
  "Sorry, something went wrong deleting the movie information";
export const CREATED_MOVIES_SUCCESS = "Movie created successfully";
export const UPDATED_MOVIES_SUCCESS = "Movie saved successfully";
export const DELETED_MOVIES_SUCCESS = "Movie deleted successfully";

// WATCHLIST MESSAGES
export const GET_WATCHLIST_SORRY =
  "Sorry, something went wrong getting the watchlist information";
export const ADD_WATCHLIST_SORRY =
  "Sorry, something went wrong adding the watchlist information";
export const DELETE_WATCHLIST_SORRY =
  "Sorry, something went wrong removing the watchlist information";
export const ADD_WATCHLIST_SUCCESS = "Movie added to watchlist successfully";
export const DELETE_WATCHLIST_SUCCESS =
  "Movie removed to watchlist successfully";

// SCORE MESSAGES
export const SCORE_SORRY =
  "Sorry, something went wrong getting the score information";
export const SCORE_ADD = "Thanks for your scoring";
export const DELETE_SCORE_SORRY =
  "Sorry, something went wrong deleting the score information";
export const DELETE_SCORE_SUCCESS = "Score deleted successfully";

// GENRE MESSAGE
export const GENRE_SORRY =
  "Sorry, something went wrong getting the genre information";

//COMMENT MESSAGE
export const COMMENT_ADD = "Thanks for your comment";

export const TABLE_ICONS = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

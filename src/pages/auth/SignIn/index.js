import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  signIn,
  getAuthenticatedUser,
} from "../../../redux/actions/authActions";

import {
  Checkbox,
  FormControlLabel,
  Button as MuiButton,
  Grid,
  TextField as MuiTextField,
  Typography,
  Avatar,
  Box,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Alert as MuiAlert } from "@material-ui/lab";
import Copyright from "../Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)`
  margin-top: ${(props) => props.theme.spacing(2)}px;
`;

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(getAuthenticatedUser());
  }, [dispatch]);

  if (auth.user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.paper}>
      <Helmet title="Sign In" />

      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Sign in
      </Typography>

      <Formik
        initialValues={{
          username: "",
          password: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("Username is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await dispatch(
              signIn({ username: values.username, password: values.password })
            );
            if (history.length > 0) {
              history.goBack();
            } else {
              history.push("/");
            }
          } catch (error) {
            if (error.code === "UserNotConfirmedException") {
              history.push(`/auth/confirm-sign-up/${values.username}`);
            }

            const message = error.message || "Something went wrong";

            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            <TextField
              variant="outlined"
              name="username"
              label="Username"
              value={values.username}
              error={Boolean(touched.username && errors.username)}
              fullWidth
              helperText={touched.username && errors.username}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
            />
            <TextField
              variant="outlined"
              type="password"
              name="password"
              label="Password"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              SIGN IN
            </Button>
            <Box mt={4}>
              <Grid container my={2}>
                <Grid item xs>
                  <Link to="/auth/reset-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/auth/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
        )}
      </Formik>
      <Box mt={8}>
        <Copyright />
      </Box>
    </div>
  );
};

export default SignIn;

import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "yup-phone";
import { Formik } from "formik";
import { signUp } from "../../../redux/actions/authActions";
import {
  Grid,
  Button,
  TextField as MuiTextField,
  Typography,
  Box,
  Avatar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import { Alert as MuiAlert } from "@material-ui/lab";

import Copyright from "../Copyright";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
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

function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className={classes.paper}>
      <Helmet title="Sign Up" />

      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>

      <Formik
        initialValues={{
          username: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("Username is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          phoneNumber: Yup.string()
            .phone(null, null, "Must be a valid phone number")
            .required("Phone number is required"),
          password: Yup.string()
            .min(12, "Must be at least 12 characters")
            .max(255)
            .required("Required"),
          confirmPassword: Yup.string().when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Both password need to be the same"
            ),
          }),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await dispatch(
              signUp({
                username: values.username,
                password: values.password,
                email: values.email,
                phoneNumber: values.phoneNumber,
              })
            );
            history.push(`/auth/confirm-sign-up/${values.username}`);
          } catch (error) {
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
              type="text"
              name="username"
              label="Username"
              variant="outlined"
              value={values.username}
              error={Boolean(touched.username && errors.username)}
              fullWidth
              helperText={touched.username && errors.username}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <TextField
              type="email"
              name="email"
              label="Email Address"
              variant="outlined"
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <TextField
              type="text"
              name="phoneNumber"
              label="Phone number"
              variant="outlined"
              value={values.phoneNumber}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              fullWidth
              helperText={touched.phoneNumber && errors.phoneNumber}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <TextField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              value={values.confirmPassword}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              fullWidth
              helperText={touched.confirmPassword && errors.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              SIGN UP
            </Button>

            <Box mt={4}>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/auth/sign-in" variant="body2">
                    Already have an account? Sign in
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
}

export default SignUp;

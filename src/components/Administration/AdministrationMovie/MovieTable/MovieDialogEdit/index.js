import React, { useEffect } from "react";
import styled from "styled-components/macro";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import { Autocomplete as MuiAutocomplete } from "@material-ui/lab";
import { useForm, useWatch, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useGenre from "../../../../../hooks/useGenre";

const NO_IMAGE_AVAILABLE =
  "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";

const DEFAULT_FORM_DATA = {
  title: "",
  description: "",
  produced_by: "",
  genre: [],
  release_date: "",
  fandango_url: "",
  poster_url: "",
};

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  produced_by: Yup.string().required("Produced by is required"),
  description: Yup.string().required("Description is required"),
  genre: Yup.array().of(Yup.object()).required("Genre is required"),
  release_date: Yup.number().required("Release date is required"),
  fandango_url: Yup.string().url(),
  poster_url: Yup.string().url().required("Poster URL is required"),
});

const Autocomplete = styled(MuiAutocomplete)`
  .MuiChip-root {
    height: 22px;
    background-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
  .MuiChip-deleteIcon {
    height: 18px;
    width: 18px;
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  border-radius: 15px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.6);
`;

const defaultForm = (data) =>
  !!data
    ? {
        ...data,
        genre: [],
      }
    : DEFAULT_FORM_DATA;

const MovieDialogEdit = ({ onSubmit, open, onClose, data }) => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: defaultForm(data),
    resolver: yupResolver(schema),
  });
  const { genres } = useGenre();
  const posterImage = useWatch({
    control,
    name: "poster_url",
    defaultValue: defaultForm(data).poster_url,
  });

  useEffect(() => {
    if (data && genres && genres.length > 0) {
      setValue(
        "genre",
        genres.filter(({ name }) => data.genre.includes(name))
      );
    }
  }, [data, setValue, genres]);

  const handleSubmitForm = (dataForm) => {
    const { genre, ...restData } = dataForm;
    const request = { ...restData, genre: genre.map(({ id }) => id) };
    !!data ? onSubmit(data.id, request) : onSubmit(request);

    reset(defaultForm(data));
    onClose();
  };

  const handleClose = () => {
    reset(defaultForm(data));
    onClose();
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      scroll="paper"
      fullWidth={true}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <DialogTitle>{data ? "Edit movie" : "Create movie"}</DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} md={7} container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({
                    field,
                    fieldState: { invalid, isTouched, error },
                  }) => (
                    <TextField
                      label="Title"
                      fullWidth
                      error={isTouched && invalid}
                      helperText={isTouched && invalid && error.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="produced_by"
                  control={control}
                  render={({
                    field,
                    fieldState: { invalid, isTouched, error },
                  }) => (
                    <TextField
                      label="Produced by"
                      fullWidth
                      error={isTouched && invalid}
                      helperText={isTouched && invalid && error.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({
                    field,
                    fieldState: { invalid, isTouched, error },
                  }) => (
                    <TextField
                      label="Description"
                      fullWidth
                      multiline
                      rows={3}
                      error={isTouched && invalid}
                      helperText={isTouched && invalid && error.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="release_date"
                  control={control}
                  render={({
                    field,
                    fieldState: { invalid, isTouched, error },
                  }) => (
                    <TextField
                      label="Release date"
                      fullWidth
                      type="number"
                      error={isTouched && invalid}
                      helperText={isTouched && invalid && error.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="genre"
                  control={control}
                  defaultValue={[]}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, isTouched, error },
                  }) => (
                    <Autocomplete
                      multiple
                      options={genres}
                      onChange={(_, item) => {
                        onChange(item);
                      }}
                      value={value}
                      getOptionLabel={(option) => option.name}
                      getOptionSelected={(option, value) =>
                        option.id === value.id
                      }
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Genre"
                          placeholder="Search..."
                          fullWidth
                          error={isTouched && invalid}
                          helperText={isTouched && invalid && error.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="fandango_url"
                  control={control}
                  render={({
                    field,
                    fieldState: { invalid, isTouched, error },
                  }) => (
                    <TextField
                      label="Fadango URL"
                      fullWidth
                      error={isTouched && invalid}
                      helperText={isTouched && invalid && error.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="poster_url"
                  control={control}
                  render={({
                    field,
                    fieldState: { invalid, isTouched, error },
                  }) => (
                    <TextField
                      label="Poster URL"
                      fullWidth
                      error={isTouched && invalid}
                      helperText={isTouched && invalid && error.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <MoviePoster
                src={posterImage ? posterImage : NO_IMAGE_AVAILABLE}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit" color="primary" disabled={!isValid}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MovieDialogEdit;

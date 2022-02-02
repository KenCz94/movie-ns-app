import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

import AdministrationMovie from "../../../components/Administration/AdministrationMovie";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const AdminMovie = () => {
  return (
    <>
      <Helmet title="Movies" />

      <Typography variant="h3" gutterBottom display="inline">
        Movies
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Typography>Administration</Typography>
        <Typography>Movie</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <AdministrationMovie />
    </>
  );
};

export default AdminMovie;

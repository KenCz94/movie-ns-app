import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

import AdministrationScore from "../../../components/Administration/AdministrationScore";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const AdminScore = () => {
  return (
    <>
      <Helmet title="Movie " />

      <Typography variant="h3" gutterBottom display="inline">
        Score
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Typography>Administration</Typography>
        <Typography>Score</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <AdministrationScore />
    </>
  );
};

export default AdminScore;

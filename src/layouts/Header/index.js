import React from "react";
import styled, { withTheme } from "styled-components/macro";
import { Link } from "react-router-dom";

import {
  Grid,
  Hidden,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  Typography,
  Tooltip,
  Button,
} from "@material-ui/core";

import {
  Menu as MenuIcon,
  LiveTv as MovieIcon,
  AddToQueue as AddToQueueIcon,
} from "@material-ui/icons";

import AccountDropdown from "./../AccountDropdown";

const UserSesionAction = styled(Button)`
  color: ${(props) => props.theme.header.color};
  :hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const AppBar = styled(MuiAppBar)`
  background-color: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const HeaderActionButton = styled(Button)`
  color: ${(props) => props.theme.header.color};
  height: 100%;
  text-transform: uppercase;
  font-weight: normal;
  padding-right: ${(props) => props.theme.spacing(5)}px;
  :hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ActionButtonIcon = styled(MuiIconButton)`
  svg {
    width: 20px;
    height: 20px;
    color: ${(props) => props.theme.header.color};
  }
`;

const pageTytle = "Movies NS";

const AppBarComponent = ({
  onDrawerToggle,
  onDesktopDrawerToggle,
  desktopSidebarOpen,
  user,
}) => (
  <>
    <AppBar position="sticky" elevation={2}>
      <Toolbar>
        <Grid container alignItems="center">
          <Hidden mdUp>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h5">{pageTytle}</Typography>
            </Grid>
          </Hidden>
          <Hidden smDown>
            {user && (
              <Grid item>
                <Tooltip title={desktopSidebarOpen ? "Hide" : "Show"}>
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={onDesktopDrawerToggle}
                  >
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}

            {!desktopSidebarOpen && (
              <Grid item>
                <Typography variant="h5">{pageTytle}</Typography>
              </Grid>
            )}
          </Hidden>
          <Grid item xs />
          <Grid item>
            <HeaderActionButton component={Link} to="/">
              <ActionButtonIcon>
                <MovieIcon />
              </ActionButtonIcon>
              Movies
            </HeaderActionButton>
          </Grid>
          {user && (
            <Grid item>
              <HeaderActionButton component={Link} to="/watchlist">
                <ActionButtonIcon>
                  <AddToQueueIcon />
                </ActionButtonIcon>
                Watchlist
              </HeaderActionButton>
            </Grid>
          )}
          {user ? (
            <Grid item>
              <UserSesionAction>
                <AccountDropdown userInSession={user.name.toUpperCase()} />
              </UserSesionAction>
            </Grid>
          ) : (
            <>
              <Grid item>
                <HeaderActionButton
                  color="primary"
                  component={Link}
                  to="/auth/sign-in"
                >
                  Sign In
                </HeaderActionButton>
              </Grid>

              <Grid item>
                <HeaderActionButton
                  color="primary"
                  component={Link}
                  to="/auth/sign-up"
                >
                  Sign Up
                </HeaderActionButton>
              </Grid>
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  </>
);

export default withTheme(AppBarComponent);

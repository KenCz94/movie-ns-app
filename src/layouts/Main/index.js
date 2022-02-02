import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { createGlobalStyle } from "styled-components/macro";
import Sidebar from "../../layouts/Sidebar";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";

import { spacing } from "@material-ui/system";
import {
  Hidden,
  CssBaseline,
  Paper as MuiPaper,
  withWidth,
} from "@material-ui/core";

import { isWidthUp } from "@material-ui/core/withWidth";

import { getAuthenticatedUser } from "../../redux/actions/authActions";

const drawerWidth = 258;

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.palette.background.default};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => !props.open} {
    ${(props) => props.theme.breakpoints.up("md")} {
      width: ${drawerWidth}px;
      flex-shrink: 0;
    }
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }
`;

const Main = ({ children, routes, width }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.user) {
      dispatch(getAuthenticatedUser());
    }
  }, [dispatch, auth.user]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopDrawerToggle = () => {
    setDesktopSidebarOpen(!desktopSidebarOpen);
  };

  const isLogged = !!auth.user;

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      {isLogged && (
        <Drawer open={desktopSidebarOpen}>
          <Hidden mdUp implementation="js">
            <Sidebar
              routes={routes}
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden smDown implementation="css">
            <Sidebar
              routes={routes}
              PaperProps={{ style: { width: drawerWidth } }}
              variant="persistent"
              open={desktopSidebarOpen}
            />
          </Hidden>
        </Drawer>
      )}

      <AppContent>
        <Header
          onDrawerToggle={handleDrawerToggle}
          onDesktopDrawerToggle={handleDesktopDrawerToggle}
          desktopSidebarOpen={isLogged ? desktopSidebarOpen : false}
          user={auth.user}
        />
        <MainContent p={isWidthUp("lg", width) ? 12 : 5}>
          {children}
        </MainContent>
        <Footer />
      </AppContent>
    </Root>
  );
};

export default withWidth()(Main);

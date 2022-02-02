import React from "react";
import styled from "styled-components/macro";

import {
  Grid,
  List,
  ListItemText as MuiListItemText,
  ListItem as MuiListItem,
} from "@material-ui/core";

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(1) / 4}px
    ${(props) => props.theme.spacing(4)}px;
  background: ${(props) => props.theme.footer.background};
  position: relative;
`;

const ListItem = styled(MuiListItem)`
  display: inline-block;
  width: auto;
  padding-left: ${(props) => props.theme.spacing(2)}px;
  padding-right: ${(props) => props.theme.spacing(2)}px;
  &,
  &:hover,
  &:active {
    color: #ff0000;
  }
`;

const ListItemText = styled(MuiListItemText)`
  span {
    color: ${(props) => props.theme.footer.color};
  }
`;

function Footer() {
  return (
    <Wrapper>
      <Grid container spacing={0}>
        <Grid container item xs={12} md={12} justifyContent="flex-end">
          <List>
            <ListItem button={true}>
              <ListItemText
                primary={`© ${new Date().getFullYear()} - Nicasource`}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Footer;

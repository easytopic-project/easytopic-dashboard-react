import {
  Drawer,
  Typography,
  makeStyles,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@material-ui/core";
import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  drawer: {
    minHeight: "100vh",
    width: 250,
    display: "flex",
    flexDirection: "column",
  },
  list: {
    flexGrow: 1,
  },
  text: {
    textDecoration: "none",
  },
});

function MenuDrawer() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <>
      <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          className={classes.drawer}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box
            bgcolor="primary.main"
            color="white"
            boxShadow={2}
            textAlign="center"
            p={1}
          >
            <Typography variant="h5">Easytopic</Typography>
          </Box>
          <List className={classes.list}>
            <ListItem button component={Link} to={`/pipelines`}>
              <ListItemText>Pipelines</ListItemText>
            </ListItem>
            <ListItem button component={Link} to={`/jobs`}>
              <ListItemText>My Jobs</ListItemText>
            </ListItem>
          </List>
          <Box textAlign="center" m={3}>
            <Typography
              className={classes.text}
              color="textPrimary"
              component={Link}
              to={"/about"}
            >
              About
            </Typography>
          </Box>
        </div>
      </Drawer>
    </>
  );
}

export default MenuDrawer;

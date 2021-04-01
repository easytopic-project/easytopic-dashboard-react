import { Drawer, Typography, makeStyles, IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import React, { useState } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
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
          className={classes.list} role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} to={`/`}>
              <ListItemText>Pipelines</ListItemText>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}

export default MenuDrawer;

import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../contexts/GlobalContext";

const useStyles = makeStyles((theme) => ({
  root: {
  },
  home: {
    marginRight: "auto",
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function Header({ children }) {

  const classes = useStyles();

  const { toggleTheme } = useGlobalContext();

  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.home}>
            <Typography variant="h6">
              {children}
            </Typography>
          </Link>
          <Button onClick={toggleTheme}>Theme</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
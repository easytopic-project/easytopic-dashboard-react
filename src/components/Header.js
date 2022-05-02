import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import MenuDrawer from "./MenuDrawer";

const useStyles = makeStyles((theme) => ({
  root: {},
  home: {
    marginLeft: theme.spacing(),
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
          <MenuDrawer />
          <Link to="/" className={classes.home}>
            <Typography variant="h6">{children}</Typography>
          </Link>
          <Button
            color="inherit"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button onClick={toggleTheme} color="inherit">
            Theme
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

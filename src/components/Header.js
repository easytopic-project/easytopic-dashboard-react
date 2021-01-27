import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  home: {
    marginRight: "auto",
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function Header({ children }) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.home}>
            <Typography variant="h6">
              {children}
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
import {
  Box,
  Card,
  Grid,
  TextField,
  makeStyles,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLoginContext } from "../contexts/LoginContext";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  title: {
    marginBottom: theme.spacing(7),
    marginTop: theme.spacing(3),
  },
  input: {
    marginBottom: theme.spacing(3),
    width: "90%",
  },
  button: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(3),
    width: "90%",
  },
}));

function Login({ location: from }) {
  const classes = useStyles();

  const { validateLogin } = useLoginContext();
  const [login, setLogin] = useState({ username: "", password: "" });
  const history = useHistory();

  function inputChange(event) {
    setLogin({ ...login, [event.target.id]: event.target.value });
  }

  function onSubmit(event) {
    event.preventDefault();
    validateLogin(login);
    if (from.state) {
      history.push(from.state.from.pathname);
    } else history.push("/");
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={11} sm={8} md={4} lg={4}>
        <Card raised>
          <CardContent>
            <Box textAlign={"center"}>
              <Typography variant="h2" className={classes.title}>
                M2P
              </Typography>
              <form id="login-form" onSubmit={onSubmit}>
                <TextField
                  id="username"
                  name="username"
                  value={login.username}
                  onChange={inputChange}
                  label="Username"
                  variant="outlined"
                  className={classes.input}
                />
                <TextField
                  id="password"
                  name="password"
                  value={login.password}
                  onChange={inputChange}
                  label="Password"
                  variant="outlined"
                  className={classes.input}
                  type="password"
                />
                <Button
                  type="submit"
                  form="login-form"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  size="large"
                >
                  Login
                </Button>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Login;

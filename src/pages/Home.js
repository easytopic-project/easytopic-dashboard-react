import { Button, Typography, makeStyles, Box, Tooltip } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: theme.spacing(10),
  },
  subtitle: {
    maxWidth: "350px",
    marginBottom: theme.spacing(10),
    marginRight: theme.spacing(10),
    marginLeft: theme.spacing(2),
  },
  highlight: {
    fontWeight: "bold",
    "&:hover" :{
      color: theme.palette.primary.light,
    }
  },
}));

function Home() {

  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Box>
        <Typography variant="h1">Easytopic</Typography>
        <Box className={classes.subtitle}>
          <Typography>Gather relevant and objective data about your media materials throught one of Easytopic's 
            <Tooltip title="Add description" aria-label="pipeline">
              <Typography className={classes.highlight} color="primary" display="inline"> pipelines</Typography>
            </Tooltip>
          </Typography>
        </Box>
      </Box>
      
      <Button color="primary" variant="contained" component={Link} to="/pipelines">Select a pipeline</Button>
    </div>
  )
}

export default Home

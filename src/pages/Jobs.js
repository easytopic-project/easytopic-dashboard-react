import { Container, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Paper, makeStyles, TableHead } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import API from '../api/API'

const useStyle = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  headRow :{
    textDecoration: "none",
    backgroundColor: theme.palette.primary.main,
  },
  headCell: {
    color: "white",
    fontWeight: "bold",
  },
  row: {
    "&:hover": {
      backgroundColor: `${theme.palette.primary.dark} !important`,
    },
    textDecoration: "none",
    backgroundColor: theme.palette.primary.main,
  },
  cell: {
    color: "white",
  }
}));

function Jobs() {

  const [jobs, setJobs] = useState();
  const classes = useStyle();

  useEffect(() => {
    API.getJobs().then((res) => setJobs(res));
  }, [])

  return (
    <Container maxWidth="md">
      <Typography variant="h4" className={classes.title}>My Pipelines</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className={classes.headRow}>
              <TableCell className={classes.headCell} align="center">ID</TableCell>
              <TableCell className={classes.headCell} align="center">Type</TableCell>
              <TableCell className={classes.headCell} align="center">Version</TableCell>
              <TableCell className={classes.headCell} align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs && jobs.data.map((job) => 
              <TableRow hover className={classes.row} button key={job.id} component={Link} to={`/jobs/${job.id}`}>
                <TableCell className={classes.cell} align="center">{job.id}</TableCell>
                <TableCell className={classes.cell} align="center">{job.type.toUpperCase()}</TableCell>
                <TableCell className={classes.cell} align="center">{job.version}</TableCell>
                <TableCell className={classes.cell} align="center">{job.status.toUpperCase()}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Jobs

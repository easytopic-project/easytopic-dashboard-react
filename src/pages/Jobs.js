import { Container, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Paper, makeStyles, TableHead } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import API from '../api/API'
import { useJobsContext } from '../contexts/JobsContext';

const useStyle = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(5),
  },
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
  },
  status: {
    width: "max-content",
    padding: "3px 10px 0px 10px",
    margin: "auto",
    borderRadius: "20px",
  },
  done: {
    backgroundColor: "green",
  },
  waiting: {
    backgroundColor: "yellow",
    color: "black",
  },
  failed: {
    backgroundColor: "red",
  }
}));

function Jobs() {

  const {jobsData} = useJobsContext();
  const classes = useStyle();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" className={classes.title}>My Jobs</Typography>
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
            {jobsData && jobsData.map((job) => 
              <TableRow hover className={classes.row} key={job.id} component={Link} to={`/jobs/${job.id}`}>
                <TableCell className={classes.cell} align="center">{job.id}</TableCell>
                <TableCell className={classes.cell} align="center">{job.type.toUpperCase()}</TableCell>
                <TableCell className={classes.cell} align="center">{job.version}</TableCell>
                <TableCell className={classes.cell} align="center">
                  <div className={`${classes.status} ${classes[job.status]}`}>
                    {job.status.toUpperCase()}
                  </div>   
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Jobs

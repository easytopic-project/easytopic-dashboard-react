import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Paper,
  makeStyles,
  TableHead,
  TableSortLabel,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Status from "../components/Status";
import { useJobsContext } from "../contexts/JobsContext";

const useStyle = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(5),
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  headRow: {
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
      cursor: "pointer",
    },
    textDecoration: "none",
    backgroundColor: theme.palette.primary.main,
  },
  cell: {
    color: "white",
  },
  status: {
    margin: "auto",
  },
  labelActive: {
    color: `${theme.palette.secondary.main} !important`,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function Jobs() {
  const { jobsData } = useJobsContext();
  const classes = useStyle();
  const history = useHistory();

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("status"); //id, type, version or status

  const headCells = [
    { id: "id", numeric: true, label: "ID" },
    { id: "type", numeric: true, label: "Type" },
    { id: "version", numeric: true, label: "Version" },
    { id: "status", numeric: true, label: "Status" },
  ];

  function handleRequestSort(event, property) {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }

  function handleTableClick(id) {
    history.push(`/jobs/${id}`);
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        My Jobs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className={classes.headRow}>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  className={classes.headCell}
                  align="center"
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, headCell.id)}
                    classes={{active: classes.labelActive}}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {jobsData &&
              stableSort(jobsData, getComparator(order, orderBy)).map((job) => (
                <TableRow
                  hover
                  className={classes.row}
                  key={job.id}
                  onClick={() => handleTableClick(job.id)}
                >
                  <TableCell className={classes.cell} align="center">
                    {job.id}
                  </TableCell>
                  <TableCell className={classes.cell} align="center">
                    {job.type.toUpperCase()}
                  </TableCell>
                  <TableCell className={classes.cell} align="center">
                    {job.version}
                  </TableCell>
                  <TableCell className={classes.cell} align="center">
                    <Status color={job.status} center>
                      <Typography>{job.status.toUpperCase()}</Typography>
                    </Status>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Jobs;

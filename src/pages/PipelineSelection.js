import { Typography, FormControl, InputLabel, Select, makeStyles, MenuItem, Button, Paper, List, ListItem, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import PipelineOption from "../components/PipelineOption";
import { useGlobalContext } from "../contexts/GlobalContext";

const useStyle = makeStyles((theme) => ({
  paper: {
    "& > *": {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
    width: "40%",
    margin: "auto",
  },
  formControl: {
    marginTop: theme.spacing(5),
    width: "50%",
  },
  title : {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(5),
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
  container: {
    marginTop: theme.spacing(5),
  },
  table: {
    marginTop: theme.spacing(3),
  },
  pipOpt: {
    marginBottom: "30px",
  }
}));

export default function PipelineSelection() {

  const classes = useStyle();
  const { pipeline, pipelineOptions, setPipeline } = useGlobalContext();

  function handleSelectChange(event) {
    setPipeline(event.target.value);
  };

  return (
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" className={classes.title} >Select your pipeline</Typography>
        {pipelineOptions && pipelineOptions.map((option) =>
          <div key={option.id} className={classes.pipOpt}>
            <PipelineOption option={option} />
          </div>
        )}
        {/* <TableContainer component={Paper} className={classes.table}>
          <Table>
            <TableBody>
              {pipelineOptions && pipelineOptions.map((option) => 
                <TableRow className={classes.row} button key={option.id} component={Link} to={`/pipelines/${option.id}`}>
                  <TableCell className={classes.cell}>{option.name}</TableCell>
                  <TableCell className={classes.cell} align="right">{option.description}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Container>
  );
}
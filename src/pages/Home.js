import { Typography, FormControl, InputLabel, Select, makeStyles, MenuItem, Button, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
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
  }
}));

export default function Home() {

  const classes = useStyle();
  const { pipeline, pipelineOptions, setPipeline } = useGlobalContext();

  function handleSelectChange(event) {
    setPipeline(event.target.value);
  };

  return (
    <Paper className={classes.paper} elevation={10}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="pipeline-select-label">Pipeline</InputLabel>
        <Select
          labelId="pipeline-select-label"
          id="pipeline-select"
          value={pipeline}
          onChange={handleSelectChange}
          label="Pipeline"
        >
          {pipelineOptions && pipelineOptions.map((option) => 
            <MenuItem key={option.id} value={option}>{option.name}</MenuItem>
          )}

        </Select>
      </FormControl>
      {pipeline ? <Typography>{pipeline.description}</Typography> : null}
      <Link to={`/pipelines/${pipeline.id}`}>
      <Button variant="contained" color="primary">Start</Button>
      </Link>
    </Paper>
  );
}
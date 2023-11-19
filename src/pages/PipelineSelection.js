import { Typography, makeStyles, Container, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import PipelineOption from "../components/PipelineOption";
import { useGlobalContext } from "../contexts/GlobalContext";

const useStyle = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(5),
  },
  container: {
    marginTop: theme.spacing(5),
  },
  pipOpt: {
    marginBottom: "30px",
  },
  button: {
    width: "100%",
    backgroundColor: "green",
    "&:hover": {
      backgroundColor: "darkgreen",
    },
  },
}));

export default function PipelineSelection() {
  const classes = useStyle();
  const { pipelineOptions } = useGlobalContext();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Select your workflow
      </Typography>
      {pipelineOptions &&
        pipelineOptions.map((option) => (
          <div key={option.id} className={classes.pipOpt}>
            <PipelineOption option={option} />
          </div>
        ))}
      <Button
        component={Link}
        to="/newpipeline"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Create new workflow
      </Button>
    </Container>
  );
}

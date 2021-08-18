import { Typography, makeStyles, Container } from "@material-ui/core";
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
}));

export default function PipelineSelection() {
  const classes = useStyle();
  const { pipelineOptions } = useGlobalContext();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Select your pipeline
      </Typography>
      {pipelineOptions &&
        pipelineOptions.map((option) => (
          <div key={option.id} className={classes.pipOpt}>
            <PipelineOption option={option} />
          </div>
        ))}
    </Container>
  );
}

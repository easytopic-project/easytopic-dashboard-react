import { Container, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";
import MainForm from "../../components/MainForm";

const useStyle = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
}));

export default function PipelineForm({
  match: {
    params: { id },
  },
}) {
  const classes = useStyle();
  const { pipelineOptions, setPipeline } = useGlobalContext();

  function selectPipeline(id) {
    setPipeline(pipelineOptions.find((pipeline) => pipeline.id === id));
  }

  useEffect(() => {
    selectPipeline(id);
  }, [id]);

  return (
    <Container maxWidth="xs" className={classes.root}>
      <MainForm />
    </Container>
  );
}

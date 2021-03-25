import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home, Pipeline } from "./pages"
import { useGlobalContext } from "./contexts/GlobalContext";
import PipelineMain from "./pages/Pipeline/PipelineMain";

function AppRouter() {

  const { pipelineOptions } = useGlobalContext();

  return (
    <Router>
      <Header>Easytopic</Header>

      <Route exact path="/" component={Home} />
      <Route path="/pipelines/:id" component={Pipeline} />
      <Route path="/jobs/:id" component={PipelineMain} />
    </Router>
  );
}

export default AppRouter;

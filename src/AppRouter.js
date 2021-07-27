import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, PipelineForm, Jobs, PipelineSelection, NotFound, About } from "./pages"
import { useGlobalContext } from "./contexts/GlobalContext";
import PipelineResult from "./pages/Pipeline/PipelineResult";

function AppRouter() {

  const { pipelineOptions } = useGlobalContext();

  return (
    <Router>
      <Header>Easytopic</Header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pipelines" component={PipelineSelection} />
        <Route path="/pipelines/:id" component={PipelineForm} />
        <Route exact path="/jobs" component={Jobs} />
        <Route path="/jobs/:id" component={PipelineResult} />
        <Route path="/about" component={About} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default AppRouter;

import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home, Pipeline } from "./pages"
import { useGlobalContext } from "./contexts/GlobalContext";

function AppRouter() {

  const { pipelineOptions } = useGlobalContext();

  return (
    <Router>
      <Header>Easytopic</Header>

      <Route exact path="/" component={Home} />
      {pipelineOptions ? <Route path="/pipelines/:id" component={Pipeline} /> : <h1>Loading</h1>}
    </Router>
  );
}

export default AppRouter;

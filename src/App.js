import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import GlobalContextProvider from "./contexts/GlobalContext";
import JobsContextProvider from "./contexts/JobsContext";
import Theme from "./theme/theme";
import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Home,
  PipelineForm,
  Jobs,
  PipelineSelection,
  NotFound,
  About,
} from "./pages";
import { useGlobalContext } from "./contexts/GlobalContext";
import PipelineResult from "./pages/Pipeline/PipelineResult";

function App() {
  return (
    <Router>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <GlobalContextProvider>
          <JobsContextProvider>
            <Theme>
              <CssBaseline />
              <div className="App">
                <Header>Easytopic</Header>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route
                    exact
                    path="/pipelines"
                    component={PipelineSelection}
                  />
                  <Route path="/pipelines/:id" component={PipelineForm} />
                  <Route exact path="/jobs" component={Jobs} />
                  <Route path="/jobs/:id" component={PipelineResult} />
                  <Route path="/about" component={About} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
            </Theme>
          </JobsContextProvider>
        </GlobalContextProvider>
      </SnackbarProvider>
    </Router>
  );
}

export default App;

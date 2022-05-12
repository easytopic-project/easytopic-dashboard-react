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
  Modules,
} from "./pages";
import PipelineResult from "./pages/Pipeline/PipelineResult";
import ModulesContextProvider from "./contexts/ModulesContext";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import LoginContextProvider from "./contexts/LoginContext";
import NewPipeline from "./pages/NewPipeline";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NewPipelineContextProvider from "./contexts/NewPipelineContext";

function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <GlobalContextProvider>
            <LoginContextProvider>
              <JobsContextProvider>
                <ModulesContextProvider>
                  <NewPipelineContextProvider>
                    <Theme>
                      <CssBaseline />
                      <div className="App">
                        <Header>M2P</Header>
                        <Switch>
                          <Route exact path="/" component={Home} />
                          <PrivateRoute
                            exact
                            path="/pipelines"
                            component={PipelineSelection}
                          />
                          <PrivateRoute
                            path="/pipelines/:id"
                            component={PipelineForm}
                          />
                          <PrivateRoute exact path="/jobs" component={Jobs} />
                          <PrivateRoute
                            path="/jobs/:id"
                            component={PipelineResult}
                          />
                          <Route path="/about" component={About} />
                          <PrivateRoute path="/modules" component={Modules} />
                          <Route path="/login" component={Login} />
                          <Route path="/newpipeline" component={NewPipeline} />
                          <Route path="*" component={NotFound} />
                        </Switch>
                      </div>
                    </Theme>
                  </NewPipelineContextProvider>
                </ModulesContextProvider>
              </JobsContextProvider>
            </LoginContextProvider>
          </GlobalContextProvider>
        </SnackbarProvider>
      </DndProvider>
    </Router>
  );
}

export default App;

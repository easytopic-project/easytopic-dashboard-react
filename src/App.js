import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppRouter from "./AppRouter";
import Header from "./components/Header";
import GlobalContextProvider, {
  useGlobalContext,
} from "./contexts/GlobalContext";
import JobsContextProvider from "./contexts/JobsContext";
import { Home, Pipeline } from "./pages";
import Theme from "./theme/theme";

function App() {
  return (
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
              <AppRouter />
            </div>
          </Theme>
        </JobsContextProvider>
      </GlobalContextProvider>
    </SnackbarProvider>
  );
}

export default App;

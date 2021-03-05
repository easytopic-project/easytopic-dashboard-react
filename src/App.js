import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import GlobalContextProvider from "./contexts/GlobalContext";
import { Pipeline } from "./pages"
import Theme from "./theme/theme";

function App() {
  return (
    <GlobalContextProvider>
      <Theme>
        <CssBaseline />
        <div className="App">
          <Router>
            <Header>Easytopic</Header>

            <Route exact path="/" component={Pipeline} />

          </Router>
        </div>
      </Theme>
    </GlobalContextProvider>

  );
}

export default App;

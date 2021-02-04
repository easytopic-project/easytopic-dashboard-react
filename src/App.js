import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import { Home, Pipeline } from "./pages"
import Theme from "./theme/theme";

function App() {
  return (
    <Theme>
      <CssBaseline />
      <div className="App">
        <Router>
          <Header>Easytopic</Header>

          <Route exact path="/" component={Pipeline} />

        </Router>
      </div>
    </Theme>
  );
}

export default App;
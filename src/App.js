import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppRouter from "./AppRouter";
import Header from "./components/Header";
import GlobalContextProvider, { useGlobalContext } from "./contexts/GlobalContext";
import { Home, Pipeline } from "./pages"
import Theme from "./theme/theme";

function App() {
  return (
    <GlobalContextProvider>
      <Theme>
        <CssBaseline />
        <div className="App">
          <AppRouter />
        </div>
      </Theme>
    </GlobalContextProvider>

  );
}

export default App;

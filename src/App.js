import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  Container,
  createTheme,
  ThemeProvider,
    CssBaseline
} from "@mui/material";


import HomePage from "./pages/home";
import PanelPage from "./pages/panel";
import NavBar from "./components/navbar";
import AuthPage from "./pages/authentication";
import {envCreate} from "./redux/actions/env";

function App() {
  const dispatch = useDispatch();

  const mode = useSelector(state => state.theme);

  const theme = createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'light' ? "#f4fcfc" : "#121212",
        paper: mode === 'light' ? "#fff" : "#121212"
      }
    },
  });

  dispatch(envCreate(process.env));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box>
          <NavBar />
          <Container>
            <Switch>
              <Route path="/" exact ><HomePage /></Route>
              <Route path="/auth" exact ><AuthPage /></Route>
              <Route path="/panel" exact ><PanelPage /></Route>
            </Switch>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
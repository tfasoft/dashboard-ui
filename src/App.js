import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  Box,
  Container
} from "@mui/material";


import HomePage from "./pages/home";
import PanelPage from "./pages/panel";
import NavBar from "./components/navbar";
import AuthPage from "./pages/authentication";

function App() {
  return (
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
  );
}

export default App;
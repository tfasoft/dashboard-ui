import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";

import { logoutUser } from "../redux/actions/session";
import { deleteUser } from "../redux/actions/user";
import { unsetUID } from "../redux/actions/uid";

import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
} from "@mui/material";

const NavBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const isAuth = useSelector(state => state.session);
    const user = useSelector(state => state.user);

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Box>
            <AppBar
                color="primary"
                elevation={0}
            >
                <Container>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            sx={{
                                cursor: "pointer",
                                flexGrow: 1,
                            }}
                            onClick={() => history.push('/')}
                        >
                            TFASoft Dashboard
                        </Typography>
                        {
                            isAuth
                            ?
                                location.pathname === "/panel"
                                ?
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={() => {
                                            dispatch(logoutUser());
                                            dispatch(unsetUID());
                                            dispatch(deleteUser());
                                        }}
                                        disableElevation
                                    >
                                        Logout
                                    </Button>
                                :
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={() => history.push('/panel')}
                                        disableElevation
                                    >
                                        Panel
                                    </Button>
                            :
                                <Button
                                    variant="contained"
                                    color="info"
                                    onClick={() => history.push('/auth')}
                                    disableElevation
                                >
                                    Login
                                </Button>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
        </Box>
    )
}

export default NavBar;
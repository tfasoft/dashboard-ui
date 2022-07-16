import { useSelector, useDispatch } from "react-redux";

import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
    Link,
} from "@mui/material";

import { logoutUser } from "../redux/actions/session";

const NavBar = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.session);

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
                                flexGrow: 1,
                            }}
                        >
                            <Link
                                href="/"
                                underline="none"
                                color="inherit"
                            >
                                TFA Dashboard
                            </Link>
                        </Typography>
                        {
                            isAuth
                            ?
                                <Button
                                    variant="contained"
                                    color="info"
                                    onClick={() => dispatch(logoutUser())}
                                    disableElevation
                                >
                                    Logout
                                </Button>
                            :
                                <Button
                                    variant="contained"
                                    color="info"
                                    href="/auth"
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
import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
    Link,
} from "@mui/material";

const NavBar = () => {
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
                        <Button
                            variant="contained"
                            color="info"
                            href="/auth"
                            disableElevation
                        >
                            Login
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
        </Box>
    )
}

export default NavBar;
import { useState } from "react";

import {
    Box,
    Typography,
    Grid,
    Divider,
    TextField,
    Button,
} from "@mui/material";

const LoginTab = () => {
    return (
        <Box>
            <Typography
                variant="h4"
                color="primary"
                gutterBottom
            >
                Login
            </Typography>
            <Divider />
            <TextField
                color="primary"
                placeholder="Enter your username"
                label="Username"
                size="small"
                margin="normal"
                type="text"
                fullWidth
            />
            <TextField
                color="primary"
                placeholder="Enter password!"
                label="Password"
                size="small"
                margin="normal"
                type="text"
                fullWidth
            />
            <br />
            <br />
            <Button
                variant="contained"
                color="primary"
                size="large"
                disableElevation
                fullWidth
            >
                Login
            </Button>
        </Box>
    );
}

const RegisterTab = () => {
    return (
        <Box>
            <Typography
                variant="h4"
                color="primary"
                gutterBottom
            >
                Register
            </Typography>
            <Divider />
            <TextField
                color="primary"
                placeholder="Jon Due"
                label="Name"
                size="small"
                margin="normal"
                type="text"
                fullWidth
            />
            <TextField
                color="primary"
                placeholder="Pick a username"
                label="Username"
                size="small"
                margin="normal"
                type="text"
                fullWidth
            />
            <TextField
                color="primary"
                placeholder="Hard password!"
                label="Password"
                size="small"
                margin="normal"
                type="text"
                fullWidth
            />
            <br />
            <br />
            <Button
                variant="contained"
                color="primary"
                size="large"
                disableElevation
                fullWidth
            >
                Register
            </Button>
        </Box>
    );
}

const AuthPage = () => {
    const [login, setLogin] = useState(true);

    return (
        <Box
            sx={{
                border: 1,
                borderColor: "primary.main",
                borderRadius: 1,
                marginTop: "5rem",
            }}
        >
            <Grid
                columns={{ xs: 6, md: 12 }}
                container
            >
                <Grid
                    item
                    sx={{
                        padding: "2rem",
                    }}
                    xs={6}
                >
                    {
                        login
                        ?
                        <LoginTab />
                        :
                        <RegisterTab />
                    }
                    <br />
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={() => setLogin(!login)}
                        fullWidth
                    >
                        {
                            login
                            ?
                            "I don't have account"
                            :
                            "I have account"
                        }
                    </Button>
                </Grid>
                <Grid
                    item
                    xs={6}
                    sx={{
                        backgroundColor: "#2074D4"
                    }}
                ></Grid>
            </Grid>
        </Box>
    );
}

export default AuthPage;
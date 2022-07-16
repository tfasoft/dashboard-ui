import { useState } from "react";
import { useDispatch } from "react-redux";

import { createUser } from "../redux/actions/user";
import { logoinUser } from "../redux/actions/session";

import {
    Box,
    Typography,
    Grid,
    Divider,
    TextField,
    Button,
} from "@mui/material";

const LoginTab = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);

    const authUser = () => {
        const user = {
            email,
            password
        };

        dispatch(createUser(user));
        dispatch(logoinUser());
    }

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
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                color="primary"
                placeholder="Enter password!"
                label="Password"
                size="small"
                margin="normal"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <br />
            <br />
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => authUser()}
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
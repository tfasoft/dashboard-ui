import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Axios from "axios";

import { setUID } from "../redux/actions/uid";
import { logoinUser } from "../redux/actions/session";

import {
    Box,
    Typography,
    Grid,
    Divider,
    TextField,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";

const AuthPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.session);

    if (isAuth) {
        history.push('/panel')
    }

    const [login, setLogin] = useState(true);

    const [name, setName] = useState([]);
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);

    const [error, setError] = useState(false);

    const [errorBar, setErrorBar] = useState(false);

    const loginUser = () => {
        const userData = {
            username,
            password
        };

        Axios.post('http://localhost:5000/login', userData)
            .then((data) => {
                dispatch(setUID(data.data.id));
                dispatch(logoinUser());
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setError(true);
                    setErrorBar(true);
                }
            });
    }

    const registerUser = () => {
        const userData = {
            name,
            username,
            password
        };

        Axios.post('http://localhost:5000/register', userData)
            .then((data) => {
                dispatch(setUID(data.data.user.id));
                dispatch(logoinUser());
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setError(true);
                    setErrorBar(true);
                }
            });
    }

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
                    <Box>
                        <Typography
                            variant="h4"
                            color="primary"
                            gutterBottom
                        >
                            { login ? 'Login' : 'Register' }
                        </Typography>
                        <Divider />
                        {
                            error && <Typography>{error}</Typography>
                        }
                        {
                            !login
                            &&
                            <TextField
                                color="primary"
                                placeholder="Jon Due"
                                label="Name"
                                size="small"
                                margin="normal"
                                type="text"
                                error={error}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                            />
                        }
                        <TextField
                            color="primary"
                            placeholder="Enter your username"
                            label="Username"
                            size="small"
                            margin="normal"
                            type="text"
                            error={error}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            color="primary"
                            placeholder="Enter password!"
                            label="Password"
                            size="small"
                            margin="normal"
                            type="password"
                            error={error}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                        <br />
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => login ? loginUser() : registerUser()}
                            disableElevation
                            fullWidth
                        >
                            { login ? 'Login' : 'Register' }
                        </Button>
                    </Box>
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
                        backgroundColor: "#17a2f2"
                    }}
                ></Grid>
            </Grid>

            <Snackbar open={errorBar} autoHideDuration={6000} onClose={() => setErrorBar(false)}>
                <Alert onClose={() => setErrorBar(false)} severity="error">
                    Sorry, user is not found.
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default AuthPage;
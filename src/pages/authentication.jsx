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
    const env = useSelector(state => state.env);

    if (isAuth) {
        history.push('/panel')
    }

    const [login, setLogin] = useState(true);

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    // Snackbar
    const [openSnack, setOpenSnack] = useState(false);
    const [messageSnack, setMessageSnack] = useState('');
    const [typeSnack, setTypeSnack] = useState('');
    const createSnack = (message, type) => {
        setMessageSnack(message);
        setTypeSnack(type);

        setOpenSnack(true)
    }

    const authUser = () => {
        if (login) {
            if (username !== '' && password !== '') {
                const userData = {
                    username,
                    password
                };

                Axios.post(`${env.REACT_APP_BACKEND_API}/auth/login`, userData)
                    .then((data) => {
                        dispatch(setUID(data.data.id));
                        dispatch(logoinUser());
                    })
                    .catch((error) => {
                        if (error.response.status === 401) {
                            setError(true);
                            createSnack('Sorry, user is not found.', 'error');
                        }
                    });
            } else {
                createSnack('Complete all fields.', 'error');
                setError(true);
            }
        } else {
            if (name !== '' && username !== '' && password !== '') {
                const userData = {
                    name,
                    username,
                    password
                };

                Axios.post(`${env.REACT_APP_BACKEND_API}/auth/register`, userData)
                    .then((data) => {
                        dispatch(setUID(data.data.id));
                        dispatch(logoinUser());
                    })
                    .catch((error) => {
                        createSnack(error.message, 'error');
                    });
            } else {
                createSnack('Complete all fields.', 'error');
                setError(true);
            }
        }
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
                                value={name}
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
                            value={username}
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
                            value={password}
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
                        backgroundColor: "primary.main"
                    }}
                >
                </Grid>
            </Grid>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert onClose={() => setOpenSnack(false)} severity={typeSnack}>
                    {messageSnack}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default AuthPage;
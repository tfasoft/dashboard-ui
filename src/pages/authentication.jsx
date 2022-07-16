import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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

const AuthPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.session);

    if (isAuth) {
        history.push('/panel')
    }

    const [login, setLogin] = useState(true);

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
                            !login
                            &&
                            <TextField
                                color="primary"
                                placeholder="Jon Due"
                                label="Name"
                                size="small"
                                margin="normal"
                                type="text"
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
                        backgroundColor: "#2074D4"
                    }}
                ></Grid>
            </Grid>
        </Box>
    );
}

export default AuthPage;
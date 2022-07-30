import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetUser } from "../../hooks/getUserHook";

import Axios from "axios";

import { logoutUser } from "../../redux/actions/session";
import { unsetUID } from "../../redux/actions/uid";
import { deleteUser } from "../../redux/actions/user";
import { setTheme } from "../../redux/actions/theme";

import {
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    Grid,
    Select,
    MenuItem,
    Alert,
    Snackbar,
    InputLabel,
    FormControl,
} from "@mui/material";

import {
    Person,
    Badge,
    Key,
    Brush,
    Logout
} from "@mui/icons-material";

import TwoInRow from "../../components/panelrowitem";
import LoadingBox from "../../components/loading";

const SettingsTab = () => {
    const user = useSelector(state => state.user);
    const uid = useSelector(state => state.uid);
    const env = useSelector(state => state.env);

    useGetUser(uid);

    const dispatch = useDispatch();

    // Snackbar
    const [openSnack, setOpenSnack] = useState(false);
    const [messageSnack, setMessageSnack] = useState('');
    const [typeSnack, setTypeSnack] = useState('');
    const createSnack = (message, type) => {
        setMessageSnack(message);
        setTypeSnack(type);

        setOpenSnack(true)
    }

    // Change name setting
    const [name, setName] = useState('');
    const updateName = () => {
        const data = {
            "id": user._id,
            "name": name
        };

        Axios.post(`${env.REACT_APP_BACKEND_API}/change/name`, data)
            .then((data) => {
                createSnack('Name changed successfully.', 'success');

                setName('');
            })
            .catch((error) => {
                createSnack('Sorry, an error occurred.', 'error');
            });
    }

    // Change username setting
    const [username, setUsername] = useState('');
    const updateUsername = () => {
        const data = {
            "id": user._id,
            "username": name
        };

        Axios.post(`${env.REACT_APP_BACKEND_API}/change/username`, data)
            .then((data) => {
                createSnack('Username changed successfully.', 'success');

                setUsername('');
            })
            .catch((error) => {
                createSnack('Sorry, an error occurred.', 'error');
            });
    }

    // Change password setting
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const updatePassword = () => {
        if (currentPassword !== '' && newPassword !== '' && confirmPassword !== '') {
            if (currentPassword === user.password) {
                if (newPassword === confirmPassword) {
                    if (currentPassword !== newPassword) {
                        const data = {
                            "id": user._id,
                            "password": newPassword
                        }

                        Axios.post(`${env.REACT_APP_BACKEND_API}/change/password`, data)
                            .then((data) => {
                                createSnack('Name changed successfully.', 'success');

                                setCurrentPassword('');
                                setNewPassword('');
                                setConfirmPassword('');
                            })
                            .catch((error) => {
                                createSnack('Sorry, an error occurred.', 'error');
                            });
                    } else createSnack('New password must be different with your current password', 'error');
                } else createSnack('New password and confirm password are not same.', 'error');
            } else createSnack('Your current password is wrong.', 'error');
        } else createSnack('Complete all fields first.', 'error');
    }

    // Change theme setting
    const theme = useSelector(state => state.theme);

    return (
        user._id === undefined
            ?
            <LoadingBox />
            :
            <Box>
                <TwoInRow
                    title="Change name"
                    details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                    color="primary"
                    content={
                        <Grid
                            columns={{ xs: 6, md: 12 }}
                            spacing={2}
                            container
                        >
                            <Grid
                                xs={12}
                                item
                            >
                                <TextField
                                    color="primary"
                                    placeholder="New Name"
                                    label="Name"
                                    size="small"
                                    margin="none"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                item
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    onClick={() => updateName()}
                                    disableElevation
                                >
                                    Change name
                                </Button>
                            </Grid>
                        </Grid>
                    }
                />
                <Box>
                    <br />
                    <Divider />
                    <br />
                </Box>
                <TwoInRow
                    title="Change username"
                    details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                    color="primary"
                    content={
                        <Grid
                            columns={{ xs: 6, md: 12 }}
                            spacing={2}
                            container
                        >
                            <Grid
                                xs={12}
                                item
                            >
                                <TextField
                                    color="primary"
                                    placeholder="New Username"
                                    label="Username"
                                    size="small"
                                    margin="none"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                item
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    onClick={() => updateUsername()}
                                    disableElevation
                                >
                                    Change username
                                </Button>
                            </Grid>
                        </Grid>
                    }
                />
                <Box>
                    <br />
                    <Divider />
                    <br />
                </Box>
                <TwoInRow
                    title="Change password"
                    details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                    color="primary"
                    content={
                        <Box>
                            <Grid
                                columns={{ xs: 6, md: 12 }}
                                spacing={2}
                                container
                            >
                                <Grid
                                    xs={12}
                                    item
                                >
                                    <TextField
                                        color="primary"
                                        placeholder="Enter current Password"
                                        label="Current password"
                                        size="small"
                                        margin="none"
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid
                                    xs={6}
                                    item
                                >
                                    <TextField
                                        color="primary"
                                        placeholder="Enter new Password"
                                        label="New password"
                                        size="small"
                                        margin="none"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid
                                    xs={6}
                                    item
                                >
                                    <TextField
                                        color="primary"
                                        placeholder="Confirm new Password"
                                        label="Confirm password"
                                        size="small"
                                        margin="none"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    item
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        onClick={() => updatePassword()}
                                        disableElevation
                                    >
                                        Change password
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    }
                />
                <Box>
                    <br />
                    <Divider />
                    <br />
                </Box>
                <TwoInRow
                    title="Change theme"
                    details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                    color="primary"
                    content={
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel>Theme</InputLabel>
                                <Select
                                    variant="outlined"
                                    value={theme}
                                    label="Theme"
                                    size="medium"
                                    color="primary"
                                    onChange={(e) => dispatch(setTheme(e.target.value))}
                                >
                                    <MenuItem value='light'>Light</MenuItem>
                                    <MenuItem value='dark'>Dark</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    }
                />
                <Box>
                    <br />
                    <Divider color="error" />
                    <br />
                </Box>
                <TwoInRow
                    title="Logout"
                    details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                    color="error"
                    content={
                        <Box>
                            <Button
                                variant="contained"
                                color="error"
                                size="medium"
                                onClick={() => {
                                    dispatch(logoutUser());
                                    dispatch(unsetUID());
                                    dispatch(deleteUser());
                                }}
                                disableElevation
                            >
                                Logout
                            </Button>
                        </Box>
                    }
                />

                <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                    <Alert onClose={() => setOpenSnack(false)} severity={typeSnack}>
                        {messageSnack}
                    </Alert>
                </Snackbar>
            </Box>
    );
}

export default SettingsTab;
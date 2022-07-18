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
} from "@mui/material";

import {
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

    useGetUser(uid);

    const dispatch = useDispatch();

    // Snackbar
    const [openSnack, setOpenSnack] = useState(false);
    const [messageSnack, setMessageSnack] = useState('');
    const [typeSnack, setTypeSnack] = useState('');

    // Change name setting
    const [name, setName] = useState('');
    const updateName = () => {
        const data = {
            "id": user._id,
            "name": name
        };

        Axios.post('http://localhost:5000/change/name', data)
            .then((data) => {
                setMessageSnack('Name changed successfully.');
                setTypeSnack('success');

                setOpenSnack(true);

                setName('');
            })
            .catch((error) => {
                setMessageSnack('Sorry, an error occurred.');
                setTypeSnack('error');

                setOpenSnack(true);
            });
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
                    icon={<Badge fontSize="large" />}
                    title="Change name"
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
                    icon={<Key fontSize="large" />}
                    title="Change password"
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
                    icon={<Brush fontSize="large" />}
                    title="Change theme"
                    color="primary"
                    content={
                        <Box>
                            <Select
                                variant="outlined"
                                value={theme}
                                label="Color"
                                size="medium"
                                color="primary"
                                onChange={(e) => dispatch(setTheme(e.target.value))}
                                fullWidth
                            >
                                <MenuItem value='light'>Light</MenuItem>
                                <MenuItem value='dark'>Dark</MenuItem>
                            </Select>
                        </Box>
                    }
                />
                <Box>
                    <br />
                    <Divider color="error" />
                    <br />
                </Box>
                <TwoInRow
                    icon={<Logout fontSize="large" />}
                    title="Logout"
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
import {
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    Grid, Select, MenuItem,
} from "@mui/material";

import TwoInRow from "../../components/panelrowitem";

import { logoutUser } from "../../redux/actions/session";
import { unsetUID } from "../../redux/actions/uid";
import { deleteUser } from "../../redux/actions/user";

import { useDispatch, useSelector } from "react-redux";
import {setTheme} from "../../redux/actions/theme";

const SettingsTab = () => {
    const dispatch = useDispatch();

    const theme = useSelector(state => state.theme);

    return (
        <Box>
            <TwoInRow
                title={
                    <Typography
                        color="primary"
                        variant="h4"
                    >
                        Change name
                    </Typography>
                }
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
                title={
                    <Typography
                        color="primary"
                        variant="h4"
                    >
                        Change password
                    </Typography>
                }
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
                title={
                    <Typography
                        color="primary"
                        variant="h4"
                    >
                        Change theme
                    </Typography>
                }
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
                title={
                    <Typography
                        color="error"
                        variant="h4"
                    >
                        Logout
                    </Typography>
                }
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
        </Box>
    );
}

export default SettingsTab;
import { useSelector } from "react-redux";
import { useState } from "react";

import { useGetUser } from "../../hooks/getUserHook";

import {
    Box,
    Typography,
    TextField,
    FormControlLabel,
    IconButton,
    Button,
    Divider,
    Checkbox,
    Snackbar,
    Alert
} from "@mui/material";

import {
    CopyAll,
    Lock,
    Delete,
} from "@mui/icons-material";

import TwoInRow from "../../components/panelrowitem";
import LoadingBox from "../../components/loading";

const AccountTab = () => {
    const user = useSelector(state => state.user);
    const uid = useSelector(state => state.uid);

    useGetUser(uid);

    const [agree, setAgree] = useState(false);
    const [copied, setCopied] = useState(false);

    const [password, setPassword] = useState('');

    const accessToken = user.access_token;

    return (
        user._id === undefined
            ?
            <LoadingBox />
            :
            <Box>
                <TwoInRow
                    icon={<Lock fontSize="large" />}
                    title="Access token"
                    color="primary"
                    content={
                        <Box>
                            <Box
                                sx={{ display: 'flex', width: "100%" }}
                            >
                                <TextField
                                    color="primary"
                                    label="Access token"
                                    size="small"
                                    type="text"
                                    value={accessToken}
                                    margin="none"
                                    sx={{ flex: 1 }}
                                    fullWidth
                                    disabled
                                />
                                <IconButton
                                    color="primary"
                                    onClick={() => {
                                        navigator.clipboard.writeText(accessToken);
                                        setCopied(true);
                                    }}
                                >
                                    <CopyAll />
                                </IconButton>
                            </Box>
                        </Box>
                    }
                />
                <Box>
                    <br />
                    <Divider color="error" />
                    <br />
                </Box>
                <TwoInRow
                    icon={<Delete fontSize="large" />}
                    title="Delete account"
                    color="error"
                    content={
                        <Box>
                            <TextField
                                color="error"
                                label="Password"
                                placeholder="Enter password"
                                size="small"
                                type="password"
                                margin="none"
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="error"
                                        checked={agree}
                                        onChange={() => setAgree(!agree)}
                                    />
                                }
                                label="I agree with deleting my account"
                            />
                            <br />
                            <Button
                                variant="contained"
                                color="error"
                                disableElevation
                                disabled={
                                    !agree
                                }
                            >
                                Delete my account
                            </Button>
                        </Box>
                    }
                />

                <Snackbar open={copied} autoHideDuration={6000} onClose={() => setCopied(false)}>
                    <Alert onClose={() => setCopied(false)} severity="info">
                        Access token copied in clipboard
                    </Alert>
                </Snackbar>
            </Box>
    );
}

export default AccountTab;
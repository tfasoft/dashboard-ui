import { useSelector } from "react-redux";
import { useState } from "react";

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
    CopyAll
} from "@mui/icons-material";

import TwoInRow from "../../components/panelrowitem";

const AccountTab = () => {
    const [agree, setAgree] = useState(false);
    const [copied, setCopied] = useState(false);

    const [password, setPassword] = useState('');

    const [accessToken, setAccessToken] = useState(useSelector(state => state.user.access_token));

    return (
        <Box>
            <TwoInRow
                title={
                    <Typography
                        color="primary"
                        variant="h4"
                    >
                        Access token
                    </Typography>
                }
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
                title={
                    <Typography
                        color="error"
                        variant="h4"
                    >
                        Delete account
                    </Typography>
                }
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
                    Accrss token copied in clipboard
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default AccountTab;
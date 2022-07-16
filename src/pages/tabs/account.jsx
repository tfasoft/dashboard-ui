import {
    Box,
    Typography,
    TextField,
    FormControlLabel,
    IconButton,
    Button,
    Divider,
    Checkbox,
} from "@mui/material";

import {
    CopyAll
} from "@mui/icons-material";

import TwoInRow from "../../components/panelrowitem";
import { useState } from "react";

const AccountTab = () => {
    const [agree, setAgree] = useState(false);
    const [accessToken, setAccessToken] = useState('lMdmPudOYFfoIoBKGvsHgOMsX')

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
                            <IconButton color="primary">
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
                                agree ? false : true
                            }
                        >
                            Delete my account
                        </Button>
                    </Box>
                }
            />
        </Box>
    );
}

export default AccountTab;
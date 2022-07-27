import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import Axios from "axios";

import { useGetUser } from "../../hooks/getUserHook";

import { logoutUser } from "../../redux/actions/session";
import { unsetUID } from "../../redux/actions/uid";
import { deleteUser } from "../../redux/actions/user";

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
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";

import {
    CopyAll,
    Lock,
    Delete,
    Quiz,
} from "@mui/icons-material";

import TwoInRow from "../../components/panelrowitem";
import LoadingBox from "../../components/loading";

const AccountTab = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const uid = useSelector(state => state.uid);
    const env = useSelector(state => state.env);

    useGetUser(uid);

    const [agree, setAgree] = useState(false);
    const [copied, setCopied] = useState(false);

    // Snackbar
    const [openSnack, setOpenSnack] = useState(false);
    const [messageSnack, setMessageSnack] = useState('');
    const [typeSnack, setTypeSnack] = useState('');
    const createSnack = (message, type) => {
        setMessageSnack(message);
        setTypeSnack(type);

        setOpenSnack(true)
    }

    // Confirm delete
    const [openConfirm, setOpenConfirm] = useState(false);

    // Delete account
    const [password, setPassword] = useState('');
    const deleteAccountDialogHandler = () => {
        if (password !== '') {
            if (password === user.password) setOpenConfirm(true);
            else createSnack('Wrong password.', 'error');
        } else createSnack('Complete field first.', 'error');
    }

    const deleteAccount = () => {
        const data = {
            "id": user._id,
        }

        Axios.post(`${env.REACT_APP_BACKEND_API}/change/delete`, data)
            .then((data) => {
                dispatch(logoutUser());
                dispatch(unsetUID());
                dispatch(deleteUser());
            })
            .catch((error) => {
                createSnack('Sorry, an error occurred.', 'error');
            });
    }

    const accessToken = user.access_token;
    const serviceType = user.service_type;

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
                    <Divider />
                    <br />
                </Box>
                <TwoInRow
                    icon={<Quiz fontSize="large" />}
                    title="Service Type"
                    color="primary"
                    content={
                        <Box>
                            <Box
                                sx={{ display: 'flex', width: "100%" }}
                            >
                                <TextField
                                    color="primary"
                                    label="Service Type"
                                    size="small"
                                    type="text"
                                    value={serviceType}
                                    margin="none"
                                    fullWidth
                                    disabled
                                />
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
                                value={password}
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
                                onClick={() => deleteAccountDialogHandler()}
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

                <Dialog
                    open={openConfirm}
                    onClose={() => setOpenConfirm(false)}
                >
                    <DialogTitle>
                        Confirm delete account?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you confirm that you want to delete your account?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="text"
                            color="error"
                            onClick={() => deleteAccount()}
                        >
                            I confirm
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar open={copied} autoHideDuration={6000} onClose={() => setCopied(false)}>
                    <Alert onClose={() => setCopied(false)} severity="info">
                        Access token copied in clipboard
                    </Alert>
                </Snackbar>

                <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                    <Alert onClose={() => setOpenSnack(false)} severity={typeSnack}>
                        {messageSnack}
                    </Alert>
                </Snackbar>
            </Box>
    );
}

export default AccountTab;
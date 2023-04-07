import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import md5 from "md5";

import {
  Box,
  IconButton,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { CopyAll } from "@mui/icons-material";

import { TwoInRow, Form } from "@/components";
import API from "@/api";

import { unsetToken } from "@/redux/actions/token";
import { unsetUser } from "@/redux/actions/user";

const AccountTab = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  // Snackbar
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [typeSnack, setTypeSnack] = useState("");

  const createSnack = (message, type) => {
    setMessageSnack(message);
    setTypeSnack(type);

    setOpenSnack(true);
  };

  // Confirm delete
  const [openConfirm, setOpenConfirm] = useState(false);

  const deleteCallback = (callback) => {
    const { agreed, password } = callback;

    if (agreed && user.password === md5(password)) {
      setOpenConfirm(true);
    } else {
      createSnack("Check data again", "error");
    }
  };

  const deleteAccount = async (callback) => {
    try {
      await API.delete(`users/${user._id}`);

      dispatch(unsetToken());
      dispatch(unsetUser());
    } catch (error) {}
  };

  return (
    <Box>
      <TwoInRow
        title="Access token"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        color="primary"
        content={
          <Box display="flex">
            <Form name="accessToken" def={user} />
            <IconButton
              color="primary"
              onClick={() => {
                navigator.clipboard.writeText(user.access_token);

                createSnack("Access token copied", "info");
              }}
            >
              <CopyAll />
            </IconButton>
          </Box>
        }
      />
      <TwoInRow
        title="Service Type"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        color="primary"
        content={<Form name="serviceType" def={user} />}
      />
      <TwoInRow
        title="Delete account"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        color="error"
        content={
          <Box>
            <Form
              name="deleteAcount"
              callback={deleteCallback}
              button="Delete my account"
              btnStyle={{ fullWidth: false, disabled: false }}
            />
          </Box>
        }
      />

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm delete account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you confirm that you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="error" onClick={() => deleteAccount()}>
            I confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSnack(false)}
      >
        <Alert onClose={() => setOpenSnack(false)} severity={typeSnack}>
          {messageSnack}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AccountTab;

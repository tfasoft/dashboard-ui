import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { TwoInRow, Form } from "@/components";
import API from "@/api";

import { unsetToken } from "@/redux/actions/token";
import { unsetUser } from "@/redux/actions/user";

import md5 from "md5";

const SettingsTab = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // Snackbar
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [typeSnack, setTypeSnack] = useState("");

  const createSnack = (message, type) => {
    setMessageSnack(message);
    setTypeSnack(type);

    setOpenSnack(true);
  };

  const update = async (callback) => {
    try {
      const result = await API.patch(`users/${user._id}`, callback);

      createSnack(result.data.message, "success");
    } catch (error) {
      createSnack(JSON.stringify(error), "error");
    }
  };

  const changePassword = async (callback) => {
    try {
      const result = await API.patch(`users/password/${user._id}`, callback);

      createSnack(result.data.message, "success");
    } catch (error) {
      createSnack(error.response.data.message, "error");
    }
  };

  const regenerateAccessToken = async (callback) => {
    const { agreed, password } = callback;

    if (agreed) {
      if (user.password === md5(password)) {
        try {
          const result = await API.get(`users/access/${user._id}`);

          createSnack(result.data.message, "success");
        } catch (error) {
          createSnack(error.response.data.message, "error");
        }
      } else {
        createSnack("Wrong password", "error");
      }
    } else {
      createSnack("First agree the rules!", "error");
    }
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
        title="Change name"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        color="primary"
        content={
          <Form
            name="changeName"
            def={user}
            callback={update}
            button="Change name"
            btnStyle={{ fullWidth: false, disabled: false }}
          />
        }
      />
      <TwoInRow
        title="Change common data"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        color="primary"
        content={
          <Form
            name="changeCommon"
            def={user}
            callback={update}
            button="Change common data"
            btnStyle={{ fullWidth: false, disabled: false }}
          />
        }
      />
      <TwoInRow
        title="Change password"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        color="primary"
        content={
          <Form
            name="changePassword"
            callback={changePassword}
            button="Change password"
            btnStyle={{ fullWidth: false, disabled: false }}
          />
        }
      />
      <TwoInRow
        title="Regenrate access token"
        details="You can re-generate your access token for times that your access token is spoiled or any reason."
        color="error"
        content={
          <Form
            name="regenerateAccessToken"
            callback={regenerateAccessToken}
            button="Regenerate"
            btnStyle={{ fullWidth: false, disabled: false }}
          />
        }
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
                dispatch(unsetToken());
                dispatch(unsetUser());
              }}
              disableElevation
            >
              Logout
            </Button>
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

export default SettingsTab;

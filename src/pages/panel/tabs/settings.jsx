import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Alert, Snackbar } from "@mui/material";

import { TwoInRow, Form } from "@/components";
import API from "@/api";

import { unsetToken } from "@/redux/actions/token";
import { unsetUser } from "@/redux/actions/user";

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

  return (
    <Box>
      <TwoInRow
        title="Change name"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        color="primary"
        content={
          <Form
            name="changeName"
            def={{
              name: user.name,
            }}
            callback={update}
            button="Change name"
            btnStyle={{ fullWidth: false, disabled: false }}
          />
        }
      />
      <TwoInRow
        title="Change username"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        color="primary"
        content={
          <Form
            name="changeUsername"
            def={{
              username: user.username,
            }}
            callback={update}
            button="Change username"
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

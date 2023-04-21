import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { setToken } from "@/redux/actions/token";
import { setUser } from "@/redux/actions/user";

import { Form } from "@/components";
import API from "@/api";

import {
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const Auth = () => {
  const dispatch = useDispatch();
  const history = useRouter();

  const [login, setLogin] = useState(true);

  const { token } = useSelector((state) => state);

  useEffect(() => {
    if (token) history.push("/panel");
  }, [token]);

  // Snackbar
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [typeSnack, setTypeSnack] = useState("");

  const createSnack = (message, type) => {
    setMessageSnack(message);
    setTypeSnack(type);

    setOpenSnack(true);
  };

  const authUser = async (callback) => {
    try {
      const result = await API.post(
        `auth/${login ? "login" : "register"}`,
        callback
      );

      const { user, token } = result.data;

      dispatch(setUser(user));
      dispatch(setToken(token));
    } catch (error) {
      createSnack(error.response.data.message, "error");
    }
  };

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "primary.main",
        borderRadius: 1,
        marginTop: "5rem",
      }}
    >
      <Grid columns={{ xs: 6, md: 12 }} container>
        <Grid
          item
          sx={{
            padding: "2rem",
          }}
          xs={6}
        >
          <Box>
            <Typography variant="h4" color="primary" gutterBottom>
              {login ? "Login" : "Register"}
            </Typography>
            <Divider />
            <Form
              name={login ? "login" : "register"}
              callback={authUser}
              button={login ? "Login" : "Register"}
              btnStyle={{
                fullWidth: true,
                disabled: false,
              }}
            />
          </Box>
          <br />
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => setLogin(!login)}
            fullWidth
          >
            {login ? "I don't have account" : "I have account"}
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            backgroundColor: "primary.main",
          }}
        />
      </Grid>

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

export default Auth;

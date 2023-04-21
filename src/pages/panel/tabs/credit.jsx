import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";

import {
  Box,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import { TwoInRow, Form } from "@/components";
import API from "@/api";

const CreditTab = () => {
  const user = useSelector((state) => state.user);

  const history = useRouter();

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
  const [openBuy, setOpenBuy] = useState(false);

  const buyCredits = async (callback) => {
    callback["user"] = user._id;

    try {
      const { data } = await API.post("payment/request", callback);

      history.push(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <TwoInRow
        title="Access credits"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        color="primary"
        content={
          <Box>
            <Form name="currentCredits" def={user} />
            <br />
            <Button
              variant="contained"
              size="large"
              onClick={() => setOpenBuy(true)}
              disableElevation
            >
              Buy more credits
            </Button>
          </Box>
        }
      />

      <Dialog open={openBuy} onClose={() => setOpenBuy(false)}>
        <DialogTitle>Buy more credits</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter amount of credits here and press continue.
          </DialogContentText>
          <Form
            name="buyCredits"
            button="Continue"
            callback={buyCredits}
            btnStyle={{ fullWidth: false, disabled: false }}
          />
        </DialogContent>
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

export default CreditTab;

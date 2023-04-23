import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Chip,
  Container,
  Box,
  Button,
  Typography,
  IconButton,
} from "@mui/material";

import { ArrowBack } from "@mui/icons-material";

import { useState } from "react";
import { useRouter } from "next/router";

import { Form, TwoInRow } from "@/components";
import API from "@/api";

export const getServerSidePaths = async () => {
  const paths = [];

  try {
    const data = await API.get("services");

    data.data.map((dt) => paths.push({ params: { id: dt._id } }));
  } catch (error) {}

  return {
    paths,
    fallback: false,
  };
};

export const getServerSideProps = async ({ params }) => {
  try {
    const serviceResult = await API.get(`services/${params.id}`);

    const data = serviceResult.data;

    return {
      props: {
        service: data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: { error },
      },
    };
  }
};

const SettingsService = ({ error, service }) => {
  const history = useRouter();

  const [openDelete, setOpenDelete] = useState(false);

  // Snackbar
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [typeSnack, setTypeSnack] = useState("");

  const createSnack = (message, type) => {
    setMessageSnack(message);
    setTypeSnack(type);

    setOpenSnack(true);
  };

  const deleteService = async (callback) => {
    if (callback.serId === service.serId) {
      try {
        await API.delete(`services/${service._id}`);

        history.push("/panel");
      } catch (error) {
        createSnack(error.response.data.message, "error");
      }
    } else {
      createSnack("Enter the name correctly", "error");
    }
  };

  const updateService = async (callback) => {
    try {
      await API.patch(`services/${service._id}`, callback);

      closeModals();
      getData();
    } catch (error) {
      createSnack(error.response.data.message, "error");
    }
  };

  return (
    <Container sx={{ my: 3 }}>
      <Box display="flex" alignItems="center" height="100%">
        <IconButton
          onClick={() => history.push(`/panel/services/${service._id}`)}
          sx={{ mr: 2 }}
        >
          <ArrowBack color="primary" />
        </IconButton>
        <Typography fontSize={20} color="primary" gutterBottom>
          Back to {service.name} overview
        </Typography>
      </Box>

      <br />

      <TwoInRow
        title="Update service"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        color="primary"
        content={
          <Box>
            <Form
              name="createService"
              callback={updateService}
              def={service}
              button="Update service"
              btnStyle={{
                fullWidth: false,
                disabled: false,
              }}
            />
          </Box>
        }
      />
      <TwoInRow
        title="Delete service"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        color="error"
        content={
          <Box>
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={() => setOpenDelete(true)}
              disableElevation
            >
              Delete service
            </Button>
          </Box>
        }
      />

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm to delete service</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this service? Write{" "}
            <Chip label={service.serId} color="error" size="medium" /> in the
            field below.
          </DialogContentText>
          <Form
            name="deleteService"
            callback={deleteService}
            btnStyle={{ fullWidth: false, disabled: false, color: "error" }}
            button="Delete"
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
    </Container>
  );
};

export default SettingsService;

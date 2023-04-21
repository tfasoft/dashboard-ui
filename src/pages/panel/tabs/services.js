import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import {
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Button,
  Badge,
} from "@mui/material";

import { CopyAll } from "@mui/icons-material";

import { Form, Table } from "@/components";
import API from "@/api";

const ServicesTab = () => {
  const user = useSelector((state) => state.user);

  const [services, setServices] = useState([]);

  const [selectedService, setSelectedService] = useState({});

  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
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

  const getData = async () => {
    try {
      const { data } = await API.get(`services/all/${user._id}`);

      setServices(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteService = async (callback) => {
    if (callback.serId === selectedService.serId) {
      try {
        await API.delete(`services/${selectedService._id}`);

        closeModals();
        getData();
      } catch (error) {
        createSnack(error.response.data.message, "error");
      }
    } else {
      createSnack("Enter the name correctly", "error");
    }
  };

  const updateService = async (callback) => {
    console.log(callback);
    try {
      await API.patch(`services/${selectedSerice._id}`, callback);

      closeModals();
      getData();
    } catch (error) {
      createSnack(error.response.data.message, "error");
    }
  };

  const addService = async (callback) => {
    callback.owner = user._id;

    try {
      await API.post("services", callback);

      setOpenAdd(false);

      getData();
    } catch (error) {
      createSnack(error.response.data.message, "error");
    }
  };

  const setUpdate = async (id) => {
    try {
      const { data } = await API.get(`services/${id}`);

      setOpenUpdate(true);
      setSelectedService(data);
    } catch (error) {
      console.log(error);
    }
  };

  const setDelete = async (id) => {
    try {
      const { data } = await API.get(`services/${id}`);

      setOpenDelete(true);
      setSelectedService(data);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModals = () => {
    setOpenUpdate(false);
    setOpenDelete(false);
    setSelectedService({});
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Table
        table="services"
        data={services}
        del={setDelete}
        upd={setUpdate}
        add={() => setOpenAdd(true)}
        addText="Add new service"
      />

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Create a new service</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the service name and an identifier. Like Tfasoft demo is the
            name and tfasoft-demo is identifier.
          </DialogContentText>
          <Form
            name="createService"
            callback={addService}
            button="Add service"
            btnStyle={{
              fullWidth: false,
              disabled: false,
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openUpdate} onClose={closeModals}>
        <DialogTitle>Update {selectedService.name}</DialogTitle>
        <DialogContent>
          <Box display="flex">
            <Form name="accessToken" def={selectedService} />
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

          <Form
            name="createService"
            callback={updateService}
            def={selectedService}
            button="Update service"
            btnStyle={{
              fullWidth: false,
              disabled: false,
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onClose={closeModals}>
        <DialogTitle>Confirm to delete service</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this service? Write{" "}
            <Badge>{selectedService.serId}</Badge> in the field below.
          </DialogContentText>
          <Form
            name="deleteService"
            callback={deleteService}
            btnStyle={{ fullWidth: false, disabled: false }}
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
    </Box>
  );
};

export default ServicesTab;

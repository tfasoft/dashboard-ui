import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import {
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import { Form, Table } from "@/components";
import API from "@/api";

const ServicesTab = () => {
  const user = useSelector((state) => state.user);

  const history = useRouter();

  const [services, setServices] = useState([]);

  const [openAdd, setOpenAdd] = useState(false);

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

  const click = (id) => {
    history.push(`/panel/services/${id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Table
        table="services"
        data={services}
        clk={click}
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

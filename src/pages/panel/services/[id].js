import {
  Box,
  Snackbar,
  Alert,
  colors,
  IconButton,
  Grid,
  Container,
  Typography,
} from "@mui/material";

import { CopyAll, Settings } from "@mui/icons-material";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

import { useState } from "react";
import { useRouter } from "next/router";

import { Form, Table } from "@/components";
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

    const logResult = await API.get(`services/logs/${params.id}`);
    const analResult = await API.get(`services/analytics/${params.id}`);

    const data = serviceResult.data;

    data.logs = logResult.data;
    data.analytics = analResult.data;

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

const SingleService = ({ error, service }) => {
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

  const cahrtData = {
    labels: Object.keys(service.analytics).map((key) => key),
    datasets: [
      {
        label: "Logins",
        data: Object.values(service.analytics).map((value) => value.length),
        fill: true,
        borderColor: colors.blue[500],
        backgroundColor: colors.blue[50],
        tension: 1,
      },
    ],
  };

  return (
    <Container sx={{ my: 3 }}>
      <Box>
        <Grid container spacing={2}>
          <Grid md={6} item>
            <Box sx={{ w: "100%" }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                height="100%"
              >
                <Typography
                  variant="h4"
                  color="primary"
                  fontWeight="bold"
                  gutterBottom
                >
                  {service.name}
                </Typography>
                <IconButton
                  onClick={() =>
                    history.push(`/panel/services/settings/${service._id}`)
                  }
                >
                  <Settings color="primary" />
                </IconButton>
              </Box>
              <Typography color="primary" fontSize={15} gutterBottom>
                {service.serId}
              </Typography>

              <br />

              <Box display="flex">
                <Form
                  name="accessToken"
                  def={service}
                  btnStyle={{ color: "primary" }}
                />
                <IconButton
                  color="primary"
                  onClick={() => {
                    navigator.clipboard.writeText(service.accessToken);

                    createSnack("Access token copied", "info");
                  }}
                >
                  <CopyAll />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          <Grid md={6} item>
            <Box sx={{ w: "100%" }}>
              <Typography fontWeight={500} color="primary" fontSize={25}>
                Service usage
              </Typography>
              <Line data={cahrtData} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <br />

      <Table table="authLogs" data={service.logs} />

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

export default SingleService;

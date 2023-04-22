import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { Box, colors } from "@mui/material";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

import API from "@/api";

const AnalyticsTab = () => {
  const user = useSelector((state) => state.user);

  const [logs, setLogs] = useState([]);

  const createSnack = (message, type) => {
    setMessageSnack(message);
    setTypeSnack(type);

    setOpenSnack(true);
  };

  const getData = async () => {
    try {
      const { data } = await API.get(`users/analytics/${user._id}`);

      setLogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const data = {
    labels: Object.keys(logs).map((key) => key),
    datasets: [
      {
        label: "Logins",
        data: Object.values(logs).map((value) => value.length),
        fill: true,
        borderColor: colors.blue[500],
        backgroundColor: colors.blue[50],
        tension: 1,
      },
    ],
  };

  return (
    <Box>
      <Line data={data} />
    </Box>
  );
};

export default AnalyticsTab;

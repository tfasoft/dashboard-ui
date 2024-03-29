import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { Box } from "@mui/material";

import { Table } from "@/components";
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
      const { data } = await API.get(`users/logs/${user._id}`);

      setLogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Table table="authLogs" data={logs} />
    </Box>
  );
};

export default AnalyticsTab;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { Box, Tab } from "@mui/material";

import { TabContext, TabList, TabPanel } from "@mui/lab";

import {
  Home,
  Settings,
  AccountTree,
  BarChart,
  AttachMoney,
} from "@mui/icons-material";

import HomeTab from "./tabs/home";
import SettingsTab from "./tabs/settings";
import ServicesTab from "./tabs/services";
import AnalyticsTab from "./tabs/analytics";
import CreditTab from "./tabs/credit";

const Panel = () => {
  const history = useRouter();

  const [tab, setTab] = useState("1");
  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  const { token } = useSelector((state) => state);

  useEffect(() => {
    if (!token) history.push("/auth");
  }, [token]);

  const manageTabs = {
    tabs: [
      {
        label: "Home",
        icon: <Home />,
        value: "1",
      },
      {
        label: "Settings",
        icon: <Settings />,
        value: "2",
      },
      {
        label: "Services",
        icon: <AccountTree />,
        value: "3",
      },
      {
        label: "Analytics",
        icon: <BarChart />,
        value: "4",
      },
      {
        label: "Credit",
        icon: <AttachMoney />,
        value: "5",
      },
    ],
    panels: [
      {
        component: <HomeTab />,
        value: "1",
      },
      {
        component: <SettingsTab />,
        value: "2",
      },
      {
        component: <ServicesTab />,
        value: "3",
      },
      {
        component: <AnalyticsTab />,
        value: "4",
      },
      {
        component: <CreditTab />,
        value: "5",
      },
    ],
  };

  return (
    <Box
      sx={{
        marginTop: "1rem",
      }}
    >
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={changeTab} variant="scrollable">
            {manageTabs.tabs.map((tab) => (
              <Tab
                key={`Tab-${tab.value}`}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
                value={tab.value}
              />
            ))}
          </TabList>
        </Box>
        {manageTabs.panels.map((panel) => (
          <TabPanel key={`Panel-${panel.value}`} value={panel.value}>
            {panel.component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default Panel;

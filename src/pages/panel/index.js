import { useState } from "react";

import { Box, Tab } from "@mui/material";

import { TabContext, TabList, TabPanel } from "@mui/lab";

import { Home, Settings, Security, BarChart } from "@mui/icons-material";

import { withAuth } from "@/middlewares";

import HomeTab from "./tabs/home";
import SettingsTab from "./tabs/settings";
import AccountTab from "./tabs/account";
import AnalyticsTab from "./tabs/analytics";

const Panel = () => {
  const [tab, setTab] = useState("1");
  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  const manageTabs = {
    tabs: [
      {
        label: "Home",
        icons: <Home />,
        value: "1",
      },
      {
        label: "Settings",
        icon: <Settings />,
        value: "2",
      },
      {
        label: "Account",
        icon: <Security />,
        value: "3",
      },
      {
        label: "Analytics",
        icon: <BarChart />,
        value: "4",
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
        component: <AccountTab />,
        value: "3",
      },
      {
        component: <AnalyticsTab />,
        value: "4",
      },
    ],
  };

  return (
    <withAuth>
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
    </withAuth>
  );
};

export default Panel;

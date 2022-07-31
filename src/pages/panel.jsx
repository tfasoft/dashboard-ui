import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { useGetUser } from "../hooks/getUserHook";

import {
    Box,
    Tab,
} from "@mui/material";

import {
    TabContext,
    TabList,
    TabPanel
} from "@mui/lab";

import {
    Home,
    Settings,
    Security,
    BarChart,
} from "@mui/icons-material";

import HomeTab from "./tabs/home";
import SettingsTab from "./tabs/settings";
import AccountTab from "./tabs/account";
import AnalyticsTab from "./tabs/analytics";

const PanelPage = () => {
    const history = useHistory();

    const isAuth = useSelector(state => state.session);
    if (!isAuth) {
        history.push('/auth')
    }

    const [tab, setTab] = useState('1');
    const changeTab = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Box
            sx={{
                marginTop: "1rem",
            }}
        >
            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={changeTab} variant="scrollable">
                        <Tab
                            label="Home"
                            icon={<Home />}
                            iconPosition="start"
                            value="1"
                        />
                        <Tab
                            label="Settings"
                            icon={<Settings />}
                            iconPosition="start"
                            value="2"
                        />
                        <Tab
                            label="Account"
                            icon={<Security />}
                            iconPosition="start"
                            value="3"
                        />
                        <Tab
                            label="Analytics"
                            icon={<BarChart />}
                            iconPosition="start"
                            value="4"
                        />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <HomeTab />
                </TabPanel>
                <TabPanel value="2">
                    <SettingsTab />
                </TabPanel>
                <TabPanel value="3">
                    <AccountTab />
                </TabPanel>
                <TabPanel value="4">
                    <AnalyticsTab />
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default PanelPage;
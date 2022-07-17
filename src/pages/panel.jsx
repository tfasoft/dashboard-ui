import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Axios from "axios";

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
} from "@mui/icons-material";

import HomeTab from "./tabs/home";
import SettingsTab from "./tabs/settings";
import AccountTab from "./tabs/account";
import {createUser} from "../redux/actions/user";

const PanelPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [tab, setTab] = useState('1');

    const isAuth = useSelector(state => state.session);

    if (!isAuth) {
        history.push('/auth')
    }

    const uid = useSelector(state => state.uid);

    useEffect(() => {
        const send = {
            uid,
        }

        Axios.post('http://localhost:5000/get/admin', send)
            .then((data) => {
                dispatch(createUser(data.data));
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, [uid]);

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
                    <TabList onChange={changeTab} aria-label="lab API tabs example">
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
            </TabContext>
        </Box>
    );
}

export default PanelPage;
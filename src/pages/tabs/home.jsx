import { useSelector } from "react-redux";

import { useGetUser } from "../../hooks/getUserHook";

import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
} from "@mui/material";

import {
    Security,
    Settings,
    CopyAll
} from "@mui/icons-material";

import {
    Masonry
} from "@mui/lab";

import LoadingBox from "../../components/loading";

const HomeTab = () => {
    const user = useSelector(state => state.user);
    const uid = useSelector(state => state.uid);

    useGetUser(uid);

    return (
        user._id === undefined
            ?
            <LoadingBox />
            :
            <Box>
                <Typography
                    variant="h4"
                    color="primary"
                    gutterBottom
                >
                    Welcome {user.name}!
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                >
                    Here are some helps you may need!
                </Typography>
                <Masonry
                    spacing={2}
                    columns={{ xs: 1, sm: 1, md: 2 }}
                >
                    <Box>
                        <Card
                            variant="outlined"
                        >
                            <CardHeader
                                title="Get access token"
                            />
                            <CardContent>
                                <Typography
                                    color="text.secondary"
                                    paragraph
                                >
                                    If you want to get your Access token, head over to <Typography component="span" color="primary"><Security /> Account</Typography> and there will be your access token.
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    paragraph
                                >
                                    Click on <Typography component="span" color="primary"><CopyAll /> Copy</Typography> icon and the access token will be copied to your clipboard.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box>
                        <Card
                            variant="outlined"
                        >
                            <CardHeader
                                title="Change your account settings"
                            />
                            <CardContent>
                                <Typography
                                    color="text.secondary"
                                    paragraph
                                >
                                    To change any field or stuff, open <Typography component="span" color="primary"><Settings /> Settings</Typography> and then you can change anything.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Masonry>
            </Box>
    );
}

export default HomeTab;
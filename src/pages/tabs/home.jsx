import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
} from "@mui/material";

import {
    Security,
    Settings
} from "@mui/icons-material";

const HomeTab = () => {
    return (
        <Box>
            <Typography
                variant="h4"
                color="primary"
                gutterBottom
            >
                Home
            </Typography>
            <Typography
                variant="h5"
                gutterBottom
            >
                Here are some helps you may need!
            </Typography>
            <Grid
                columns={{ xs: 6, md: 12 }}
                spacing={2}
                container
            >
                <Grid
                    xs={6}
                    item
                >
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
                        </CardContent>
                    </Card>
                </Grid>
                <Grid
                    xs={6}
                    item
                >
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
                </Grid>
            </Grid>
        </Box>
    );
}

export default HomeTab;
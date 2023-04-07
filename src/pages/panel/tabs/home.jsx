import { useSelector } from "react-redux";

import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

import { Security, Settings, CopyAll } from "@mui/icons-material";

import { Masonry } from "@mui/lab";

const HomeTab = () => {
  const user = useSelector((state) => state.user);

  return (
    <Box>
      <Typography variant="h4" color="primary" gutterBottom>
        Welcome {user.name}!
      </Typography>
      <Typography variant="h5" gutterBottom>
        Here are some helps you may need!
      </Typography>
      <br />
      <Masonry spacing={2} columns={{ xs: 1, sm: 1, md: 2 }}>
        <Box>
          <Card variant="outlined">
            <CardHeader title="Get access token" />
            <CardContent>
              <Typography color="text.secondary" paragraph>
                If you want to get your Access token, head over to{" "}
                <Typography component="span" color="primary">
                  <Security /> Account
                </Typography>{" "}
                and there will be your access token.
              </Typography>
              <Typography color="text.secondary" paragraph>
                Click on{" "}
                <Typography component="span" color="primary">
                  <CopyAll /> Copy
                </Typography>{" "}
                icon and the access token will be copied to your clipboard.
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card variant="outlined">
            <CardHeader title="Change your account settings" />
            <CardContent>
              <Typography color="text.secondary" paragraph>
                To change any field or stuff, open{" "}
                <Typography component="span" color="primary">
                  <Settings /> Settings
                </Typography>{" "}
                and then you can change anything.
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card
            variant="outlined"
            sx={{
              borderColor: "primary.main",
            }}
          >
            <CardHeader
              title="Change theme"
              subheader={<Typography color="error">New update!</Typography>}
              sx={{
                color: "primary.main",
              }}
            />
            <CardContent>
              <Typography color="text.secondary" paragraph>
                Now, changing theme is available in{" "}
                <Typography component="span" color="primary">
                  <Settings /> Settings
                </Typography>{" "}
                tab.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Masonry>
    </Box>
  );
};

export default HomeTab;

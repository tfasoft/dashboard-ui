import { useSelector } from "react-redux";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

import { Security, Settings, CopyAll } from "@mui/icons-material";

import { Masonry } from "@mui/lab";

import API from "@/api";

const HomeTab = () => {
  const user = useSelector((state) => state.user);

  const sendAgain = async () => {
    try {
      const { data } = await API.post("activation/send", { user: user._id });

      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

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
              borderColor: user.active ? "success.main" : "error.main",
            }}
          >
            <CardHeader
              title="Account activation"
              sx={{
                color: user.active ? "success.main" : "error.main",
              }}
            />
            <CardContent>
              <Typography
                color={user.active ? "success.main" : "error.main"}
                paragraph
              >
                You account is {user.active ? "is" : "not"} active!
              </Typography>
              {!user.active && (
                <Box>
                  <Typography color="error" gutterBottom>
                    Please check your email please or tap to send the activation
                    link again.
                  </Typography>
                  <br />
                  <Button
                    variant="contained"
                    color="error"
                    size="large"
                    onClick={sendAgain}
                    disableElevation
                  >
                    Send activation link again
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Masonry>
    </Box>
  );
};

export default HomeTab;

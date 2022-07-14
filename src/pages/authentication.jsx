import {
    Box,
    Typography,
    Grid,
    Divider,
    TextField,
    FormLabel,
    Button,
} from "@mui/material";

const AuthPage = () => {
    return (
        <Box
            sx={{
                border: 1,
                borderColor: "primary.main",
                borderRadius: 1,
                padding: "2rem",
                marginTop: "5rem",
            }}
        >
            <Grid
                columns={{ xs: 6, md: 12 }}
                spacing={3}
                container
            >
                <Grid
                    item
                    xs={6}
                >
                    <Typography
                        variant="h4"
                        color="primary"
                        gutterBottom
                    >
                        Register
                    </Typography>
                    <TextField
                        color="primary"
                        placeholder="Jon Due"
                        label="Name"
                        size="small"
                        margin="normal"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        color="primary"
                        placeholder="Pick a username"
                        label="Username"
                        size="small"
                        margin="normal"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        color="primary"
                        placeholder="Hard password!"
                        label="Password"
                        size="small"
                        margin="normal"
                        type="text"
                        fullWidth
                    />
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disableElevation
                        fullWidth
                    >
                        Register
                    </Button>
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <Typography
                        variant="h4"
                        color="primary"
                        gutterBottom
                    >
                        Login
                    </Typography>
                    <TextField
                        color="primary"
                        placeholder="Enter your username"
                        label="Username"
                        size="small"
                        margin="normal"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        color="primary"
                        placeholder="Enter password!"
                        label="Password"
                        size="small"
                        margin="normal"
                        type="text"
                        fullWidth
                    />
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disableElevation
                        fullWidth
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AuthPage;
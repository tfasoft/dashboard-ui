import {
    Box,
    Typography,
    Grid,
} from "@mui/material";

const HomePage = () => {
    return (
        <Box
            sx={{
                paddingTop: "5rem"
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
                        Telegram Factor Authentication Dashboard
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Dictum varius duis at consectetur lorem. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut tortor pretium viverra suspendisse potenti nullam. Et molestie ac feugiat sed lectus. Non nisi est sit amet facilisis magna. Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut enim blandit volutpat maecenas volutpat. Ornare lectus sit amet est placerat in egestas erat. Nisi vitae suscipit tellus mauris a diam maecenas sed. Placerat duis ultricies lacus sed turpis tincidunt id aliquet.
                    </Typography>
                </Grid>
                <Grid
                    item
                    sx={{
                        textAlign: "center",
                    }}
                    xs={6}
                >
                    <img
                        src={require("../images/tfa-logo.png")}
                        alt="TFA logo"
                        height="100%"
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default HomePage;
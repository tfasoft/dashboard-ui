import { Box, Grid, Typography, Divider } from "@mui/material";

const TwoInRow = ({ color, title, details, content }) => {
  return (
    <Box>
      <Grid columns={{ xs: 6, md: 12 }} spacing={2} container>
        <Grid xs={6} item>
          <Typography
            color={color}
            variant="body1"
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
            gutterBottom
          >
            {details}
          </Typography>
        </Grid>
        <Grid xs={6} item>
          {content}
        </Grid>
      </Grid>
      <Box>
        <br />
        <Divider
          sx={{
            borderColor: `${color}.main`,
          }}
        />
        <br />
      </Box>
    </Box>
  );
};

export default TwoInRow;

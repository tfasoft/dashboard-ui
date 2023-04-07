import { createTheme, colors } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#f1f1f1",
    },
    primary: {
      main: colors.blue[600],
      // main: "#071e4e",
    },
  },
});

export default theme;

// import "@/styles/globals.css";

import { Navbar } from "@/components";
import { AppLayout } from "@/layouts";
import theme from "@/theme";
import store from "@/redux";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </Provider>
  );
}

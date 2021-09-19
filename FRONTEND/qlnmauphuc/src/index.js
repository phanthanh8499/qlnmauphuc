import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./Store";
import { SnackbarProvider } from "notistack";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@mui/material/styles";

const theme = createMuiTheme();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <App></App>
      </SnackbarProvider>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";

import './style/index.scss'
import { router } from "./routes/routes.tsx";
import { store } from "./services/store.tsx";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: `"Open Sans", sans-serif`,
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>



        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>

  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'

import './style/index.scss'
import { store } from "./services/store.tsx";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from '@mui/material';
import App from './App.tsx';

const theme = createTheme({
  typography: {
    fontFamily: `"Open Sans", sans-serif`,
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
    </Provider>

  </React.StrictMode>,
)

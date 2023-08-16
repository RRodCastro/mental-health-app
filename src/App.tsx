import './style/App.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './services/store.tsx';
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom';
import Landing from "./pages/Landing/landing.page.tsx";
import Login from "./pages/Login/login.page.tsx";
import ErrorPage from "./pages/Error/error.page.tsx";
import Register from "./pages/Register/register.page.tsx";
import Home from "./pages/Home/home.page.tsx";
import NewEntry from "./pages/NewEntry/new.entry.page.tsx";
import EntryPage from "./pages/Entry/entry.page.tsx";
import CalendarPage from "./pages/Calendar/calendar.page.tsx";
import BottomNavigationComponent from "./components/bottom-navigation/bottom.navigation.component.tsx";
import { Outlet } from "react-router-dom";
import Sessions from "./pages/Sessions/sessions.page.tsx";
import { ProtectedRoute } from "./components/protected.layout.tsx";
import { useEffect } from 'react';
import { resetToken, resetUserId, setIsUnauthorized, setToken, setUserId } from './services/auth.tsx';
import SessionPage from './pages/Session/session.page.tsx';
import ProfilePage from './pages/Profile/profile.page.tsx';
import { useLazyTokenQuery } from './services/auth.api.tsx';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { deleteDataLocalStorage, saveDataLocalStorage } from './utils/utils.tsx';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.token);
  const isUnauthorized = useSelector((state: RootState) => state.auth.isUnauthorized);

  const [triggerRefresh, { isLoading }] = useLazyTokenQuery();

  const fetchToken = async (refreshToken: string) => {
    const data = await triggerRefresh({ refreshToken });
    if (data.isSuccess) {
      if (data.data.id_token) {
        const { id_token, user_id, expires_in, refresh_token

        } = data.data;
        dispatch(setToken(data.data.id_token));
        dispatch(setUserId(user_id));
        saveDataLocalStorage({ idToken: id_token, localId: user_id, expiresIn: expires_in, refreshToken: refresh_token, });
      }
    } else {
      deleteDataLocalStorage();
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expirationDate");
    const userId = localStorage.getItem("userId");
    const refreshToken = localStorage.getItem("refreshToken");
    const now = new Date().getTime();


    if (token && parseInt(expiresAt || '') > now) {
      dispatch(setToken(token));
      dispatch(setUserId(userId));
      setTimeout(() => {
        fetchToken(refreshToken || '');
      }, (parseInt(expiresAt || '') - now))
    }
    else if (refreshToken && parseInt(expiresAt || '') < now) {
      fetchToken(refreshToken);
      setTimeout(() => {
        fetchToken(refreshToken || '');
      }, (parseInt(expiresAt || '') - now))

    }
  }, []);


  const Layout = () => (<> <Outlet />  <ProtectedRoute> <BottomNavigationComponent /> </ProtectedRoute> </>)
  const router = createBrowserRouter(
    isAuth ? [
      {
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <Landing />,

          },
          {
            path: "/login",
            element: <Login />,

          },
          {
            path: "/register",
            element: <Register />,

          },
          {
            path: "/home/:welcome?",
            element: <Home />,
          },
          {
            path: "*",
            element: <ErrorPage />
          },
          {
            path: "/new-entry",
            element: <NewEntry />
          },
          {
            path: "/entry",
            element: <EntryPage />
          },
          {
            path: "/calendar",
            element: <CalendarPage />
          },
          {
            path: "/sessions",
            element: <Sessions />
          },
          {
            path: "/session/:id",
            element: <SessionPage />
          },
          {
            path: "/profile",
            element: <ProfilePage />
          }
        ]
      },
    ] :
      [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "*",
          element: <ErrorPage />
        },

      ]
  )
  if (isLoading) {
    return <CircularProgress size={60} />
  }

  return (
    <>
      {isUnauthorized && <Box style={{'display': 'flex', 'justifyContent': 'center'}}>
        <Alert sx={{width: '60%'}} severity="error"> There is a connection error, please refresh the page or try to <Button onClick={() => {
          deleteDataLocalStorage();
          dispatch(resetUserId());
          dispatch(resetToken());
          dispatch(setIsUnauthorized(false));

          setTimeout(() => document.location.href = "/", 500);
        }} style={{height: '22px', marginLeft: '8px'}}  variant="outlined" color="error"> logout </Button></Alert>
      </Box>}
      <RouterProvider router={router} />

    </>
  )
}

export default App;

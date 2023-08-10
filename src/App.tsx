import './style/App.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './services/store.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import { setToken } from './services/auth.tsx';
import SessionPage from './pages/Session/session.page.tsx';
import ProfilePage from './pages/Profile/profile.page.tsx';
import { useLazyTokenQuery } from './services/auth.api.tsx';
import { CircularProgress } from '@mui/material';
import { saveDataLocalStorage } from './utils/utils.tsx';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.token);

  const [triggerRefresh, {isLoading}] = useLazyTokenQuery();
  


  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expirationDate");

    const refreshToken = localStorage.getItem("refreshToken");
    const now = new Date().getTime();

    const fetchToken = async () => {
      const data = await triggerRefresh({refreshToken});
      if (data.isSuccess) {
        if (data.data.id_token) {
          const { id_token, user_id, expires_in, refresh_token

          } = data.data;
          dispatch(setToken(data.data.id_token));
          saveDataLocalStorage({idToken: id_token, localId: user_id, expiresIn: expires_in, refreshToken: refresh_token, });
        }
      }
    }
    if (token && parseInt(expiresAt || '') > now) {
      dispatch(setToken(token));
    }
    else if (refreshToken && parseInt(expiresAt || '') < now) { 
      fetchToken();
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
      <RouterProvider router={router} />
    </>
  )
}

export default App;

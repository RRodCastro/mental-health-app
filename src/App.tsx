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

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const token = localStorage.getItem("o0213saWmFO^");
    if (token) {
      dispatch(setToken(token));
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
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;

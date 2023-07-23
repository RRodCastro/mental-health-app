import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing/landing.page.tsx";
import Login from "../pages/Login/login.page.tsx";
import ErrorPage from "../pages/Error/error.page.tsx";
import Register from "../pages/Register/register.page.tsx";
import Home from "../pages/Home/home.page.tsx";
import NewEntry from "../pages/NewEntry/new.entry.page.tsx";
import EntryPage from "../pages/Entry/entry.page.tsx";
import CalendarPage from "../pages/Calendar/calendar.page.tsx";
import BottomNavigationComponent from "../components/bottom-navigation/bottom.navigation.component.tsx";
import { Outlet } from "react-router-dom";
import Sessions from "../pages/Sessions/sessions.page.tsx";

const Layout = () => (<> <Outlet /> <BottomNavigationComponent /> </>)
export const router = createBrowserRouter([
    {
        element: <Layout />,
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


]);
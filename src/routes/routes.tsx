import {createBrowserRouter} from "react-router-dom";
import Landing from "../pages/Landing/landing.page.tsx";
import Login from "../pages/Login/login.page.tsx";
import ErrorPage from "../pages/Error/error.page.tsx";
import Register from "../pages/Register/register.page.tsx";
import Home from "../pages/Home/home.page.tsx";
import NewEntry from "../pages/NewEntry/new.entry.page.tsx";
import EntryPage from "../pages/Entry/entry.page.tsx";


export const router = createBrowserRouter([
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
    }
]);
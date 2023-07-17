import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import Landing from "../pages/Landing/landing.page.tsx";
import Login from "../pages/Login/login.page.tsx";
import ErrorPage from "../pages/Error/error.page.tsx";
import Register from "../pages/Register/register.page.tsx";
import Home from "../pages/Home/home.page.tsx";


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
    }
]);
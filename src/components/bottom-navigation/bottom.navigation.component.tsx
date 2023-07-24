import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SelfImprovement, CalendarToday, Home } from "@mui/icons-material";

const BottomNavigationComponent = () => {

    const menuOptions = [
        {
            label: "Home",
            icon: <Home />,
            path: "/home",
            value: 0
        },
        {
            label: "Calendar",
            icon: <CalendarToday />,
            path: "/calendar",
            value: 1
        },
        {
            label: "Sessions",
            icon: <SelfImprovement />,
            path: "/sessions",
            value: 2
        },
    ]
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        const index = menuOptions.findIndex((option) => option.path === location.pathname);
        if (index !== -1) {
            setValue(index);
        }

    }, [location]);

    if (location.pathname === "/login" || location.pathname === "/register") {
        return null;
    }
    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(_, newValue) => {
                setValue(newValue);
            }}
            className="bottom-navigation-bar"
        >
            {
                menuOptions.map((option) => {
                    return (
                        <BottomNavigationAction key={option.value} onClick={() => navigate(option.path)} label={option.label} icon={option.icon} />
                    )
                })
            }


        </BottomNavigation>
    )
}

export default BottomNavigationComponent;
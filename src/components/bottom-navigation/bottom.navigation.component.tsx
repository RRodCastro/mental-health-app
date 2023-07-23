import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavigationComponent = () => {

    const menuOptions = [
        {
            label: "Home",
            icon: <RestoreIcon />,
            path: "/home",
            value: 0
        },
        {
            label: "Calendar",
            icon: <FavoriteIcon />,
            path: "/calendar",
            value: 1
        },
        {
            label: "Nearby",
            icon: <LocationOnIcon />,
            path: "/",
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
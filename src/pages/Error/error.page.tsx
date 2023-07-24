import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../services/store";

const ErrorPage = () => {
    const navigate = useNavigate();
    const isAuth = useSelector((state: RootState) => state.auth.token);


    useEffect(() => {
        if (isAuth) {
            setTimeout(() => navigate('/home'), 1500);

        } else {
            setTimeout(() => navigate('/'), 1500);

        }
    }, []);

    return (
        <Box>
            <Typography style={{ textAlign: 'center' }} variant="h3">
                Page not found
            </Typography>
        </Box>
    )
}

export default ErrorPage;
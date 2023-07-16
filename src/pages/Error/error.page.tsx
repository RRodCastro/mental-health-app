import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    useEffect( () => {
        setTimeout(() => navigate(-1), 1500);
    }, []);

    return (
        <Box>
            <Typography variant="h2">
                Error
            </Typography>
        </Box>
    )
}

export default ErrorPage;
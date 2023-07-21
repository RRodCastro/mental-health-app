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
            <Typography style={{textAlign: 'center'}} variant="h3">
                Page not found
            </Typography>
        </Box>
    )
}

export default ErrorPage;
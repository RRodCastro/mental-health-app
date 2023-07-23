import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackComponent = () => {

    const navigate = useNavigate();

    return (
        <Box className="back-button" onClick={() => navigate(-1)}>
            <Typography>
                Back
            </Typography>
        </Box>
    )

}

export default BackComponent;
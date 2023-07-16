import { Box, Button, Typography } from "@mui/material";
import assetsConfig from "../../assets/config.ts";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing">
            <Box
            className="lading-image"
                component="img"
                alt="Logo"
                src={'src/assets/mental-health-logo2.png'}
            />
            <Box
            className="landing-buttons"
            >

            <Button onClick={() => {navigate('/login')}} variant="contained"> Login </Button>

            <Button onClick={() => {navigate('/register')}} variant="contained"> Register </Button>
            </Box>
        </div>
    )
}

export default Landing;

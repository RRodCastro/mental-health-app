import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // TODO: Implement login logic
        if (localStorage.getItem("welcomeMessage") === null) {
            navigate("/home/welcome");
        } else {
            navigate("/home");
        }
    }
    return(
        <Box className="login-page">
            <Typography variant="h2">
                Login
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                className="login-email"
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                className="login-password"
            />
            <Button onClick={() => handleLogin()} variant="contained"> Login </Button>

        </Box>
    )
}

export default Login;
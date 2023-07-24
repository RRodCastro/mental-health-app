import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLazyLoginQuery } from "../../services/auth.api";
import { useDispatch } from "react-redux";
import { setToken } from "../../services/auth";

const Login = () => {
    const navigate = useNavigate();
    const [ triggerLogin, { data, isLoading } ] = useLazyLoginQuery();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        await triggerLogin('');
        dispatch(setToken("Test"));
        if (localStorage.getItem("welcomeMessage") === null) {
            navigate("/home/welcome");
        } else {
            navigate("/home");
        }
    }
    if (isLoading) {
        return <CircularProgress size={60} />
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
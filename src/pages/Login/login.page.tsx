import { Alert, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLazyLoginQuery } from "../../services/auth.api";
import { useDispatch } from "react-redux";
import { setToken } from "../../services/auth";
import { useState } from "react";
import { emailRegex } from '../../utils/utils';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState(false);
    
    const [trigerLogin, { isLoading, isError, error }] = useLazyLoginQuery();

    const emailContainsError = validate && !emailRegex.test(email);

    const handleLogin = async () => {
        if (emailRegex.test(email)) {
            const data = await trigerLogin({ email, password });
            if (data.isSuccess) {
                if (data.data.idToken) {
                    dispatch(setToken(data.data.idToken));
                    if (localStorage.getItem("welcomeMessage") === null) {
                        setTimeout(() => navigate("/home/welcome"), 100);
                    } else {
                        setTimeout(() => navigate('/home'), 100);
                    }
                }
            }
        } else {
            setValidate(true);
        }

      
    }
    if (isLoading) {
        return <CircularProgress size={60} />
    }
    return (
        <Box className="login-page">
            <Typography variant="h2">
                Login
            </Typography>
            {isError && <Alert severity="error">{`An error ocurr:  ${error && error.data.error.message}`}</Alert>}

            <TextField
                label="Email"
                variant="outlined"
                type="email"
                className="login-email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                helperText={emailContainsError && "Enter a valid email"}
                error={emailContainsError}
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                className="login-password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <Button onClick={() => handleLogin()} variant="contained"> Login </Button>

        </Box>
    )
}

export default Login;
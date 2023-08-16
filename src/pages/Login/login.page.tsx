import { Alert, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLazyLoginQuery, useLazyResetPasswordQuery } from "../../services/auth.api";
import { useDispatch } from "react-redux";
import { setToken, setUserId } from "../../services/auth";
import { useState } from "react";
import { emailRegex } from '../../utils/utils';
import assetsConfig from "../../assets/config";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState(false);

    const [trigerLogin, { isLoading, isError, error }] = useLazyLoginQuery();
    const [ triggerReset, {isSuccess: isSuccessResetPassword, isLoading: resetPasswordIsLoading, isError: isResetPasswordIsError, error: errorResetPassword } ] = useLazyResetPasswordQuery();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const emailContainsError = validate && !emailRegex.test(email);

    const handleLogin = async () => {
        if (emailRegex.test(email)) {
            const data = await trigerLogin({ email, password });
            if (data.isSuccess) {
                if (data.data.idToken) {
                    dispatch(setToken(data.data.idToken));
                    dispatch(setUserId(data.data.localId));

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
    const handleResetPassword = async () => {
        if (emailRegex.test(email)) {
            const data = await triggerReset({ email });
            if (data.isSuccess) {
                
            }
        }
    }
    if (isLoading || resetPasswordIsLoading) {
        return <CircularProgress size={60} />
    }
    if (isPasswordVisible) {
        return (
            <Box className="login-page">
                <Box
                    className="lading-image"
                    component="img"
                    alt="Logo"
                    src={assetsConfig.mentalHealthLogo}
                />
                <Typography variant="h2">
                    Forgot Password
                </Typography>
                {isResetPasswordIsError && <Alert severity="error">{`An error ocurr:  ${errorResetPassword && errorResetPassword.data.error.message}`}</Alert>}
                {isSuccessResetPassword && <Alert severity="success">{"Check your email"}</Alert>}
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
                <Button onClick={() => handleResetPassword()} variant="contained"> Reset Password </Button>
                <Button onClick={() => setIsPasswordVisible(false)} variant="outlined"> Back </Button>

            </Box>
        )
    }
    return (
        <Box className="login-page">
            <Box
                className="lading-image"
                component="img"
                alt="Logo"
                src={assetsConfig.mentalHealthLogo}
            />
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
            <Typography onClick={() => setIsPasswordVisible(true)} className="forgot-password">
                Forgot Password?
            </Typography>
        </Box>
    )
}

export default Login;
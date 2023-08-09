import { Alert, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useLazyRegisterQuery } from "../../services/auth.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../services/auth";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Register = () => {
    const [triggerRegister, { isLoading, isError, error }] = useLazyRegisterQuery();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState(false);
    const [blurPassword, setBlurPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailContainsError = validate && !emailRegex.test(email);
    const passwordContainsError = validate && password.length <= 6;

    const handleRegistration = async () => {
        if (emailRegex.test(email) && password.length >= 6) {
            const data = await triggerRegister({ email, password });
            if (data.isSuccess) {
                if (data.data.idToken) {
                    dispatch(setToken(data.data.idToken));
                }
                setTimeout( () => navigate('/home'), 100);
            }
        } else {
            setValidate(true);
        }
    }

    if (isLoading) {
        return <CircularProgress size={60} />
    }

    return (
        <Box className="register-page">
            <Typography variant="h2">
                Register
            </Typography>
            {isError && <Alert severity="error">{`An error ocurr:  ${error && error.data.error.message}`}</Alert>}

            <TextField
                label="Email"
                variant="outlined"
                type="text"
                className="register-email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                helperText={emailContainsError && "Enter a valid email"}
                error={emailContainsError}
                onBlur={() => setBlurPassword(true)}

            />
            <TextField
                label="Password"
                variant="outlined"
                type={blurPassword ? "password" : "text"}
                className="register-password"
                helperText={passwordContainsError && "Password must be at least 6 characters long"}
                error={passwordContainsError}
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                onBlur={() => setBlurPassword(true)}
            />

            <Button
                onClick={handleRegistration}
                variant="contained"
            >
                Register
            </Button>

        </Box>
    )
}

export default Register;
import { Box, Button, TextField, Typography } from "@mui/material";

const Register = () => {
    return(
        <Box className="register-page">
            <Typography variant="h2">
                Register
            </Typography>

            <TextField
                label="Name"
                variant="outlined"
                className="register-name"
            />
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                className="register-email"
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                className="register-password"
            />
            <Button variant="contained"> Register </Button>

        </Box>
    )
}

export default Register;
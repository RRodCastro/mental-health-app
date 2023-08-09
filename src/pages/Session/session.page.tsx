import { Box, Button, Typography } from "@mui/material";
import BackComponent from "../../components/back/back.component";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SessionPage = () => {

    const session = useSelector((state: RootState) => state.session.selectedSession);
    const navigate = useNavigate();

    useEffect(() => {
        if (!session) {
            setTimeout(() => navigate("/home"), 1500);
        }
    }, []);

    if (!session) {
        return (
            <Box className="session-container">
                <BackComponent />

                <Typography style={{ textAlign: 'center', marginTop: '60px' }} variant="h5">
                    Please select a session
                </Typography>
            </Box>

        );
    }

    return (
        <Box className="session-container">
            <BackComponent />
            <Typography style={{ marginTop: '24px' }} variant="h2">
                {session.title}
            </Typography>

            <Box
                className="session-item-image"
                component="img"
                src={session.image}
            />
            <Typography
                className="session-description"
            >

                {session.description}
            </Typography>
            <Button
                style={{ marginTop: '24px' }}
                variant="contained"
                color="primary"
                className="session-button start-session-button"
            >
                Start Session
            </Button>
            <Button
                style={{ marginTop: '24px' }}
                variant="contained"
                color="primary"
                className="session-button create-new-entry-button"
            >
                Create New Entry
            </Button>
        </Box>
    )
}

export default SessionPage;
import { Box, Button, Typography } from "@mui/material";
import BackComponent from "../../components/back/back.component";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetActivityQuery, useLazyGetActivityQuery, useLazyPostActivityQuery } from "../../services/activity.api";
import { DateTime } from "luxon";

const SessionPage = () => {

    const session = useSelector((state: RootState) => state.session.selectedSession);
    const navigate = useNavigate();

    const [postActivty] = useLazyPostActivityQuery();
    const [getActivity] = useLazyGetActivityQuery();

    const token = useSelector((state: RootState) => state.auth.token);
    const userId = useSelector((state: RootState) => state.auth.userId);

    useEffect(() => {
        if (!session) {
            setTimeout(() => navigate("/home"), 1500);
        }
    }, []);

    const handleStartSession = async () => {
        if (session) {
            const now = DateTime.now();

            await postActivty({ token: token, body: { userId: userId, title: session.title, type: 1, date: now.toUTC().toString(), extra: { duration: `${session.duration.split(":")[0]} min` } } });
            await getActivity({ token: token, userId: userId });
        }

    }
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
                onClick={handleStartSession}
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
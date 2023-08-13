import { Box, Button, Typography } from "@mui/material";
import BackComponent from "../../components/back/back.component";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetActivityQuery, useLazyPostActivityQuery } from "../../services/activity.api";
import { DateTime } from "luxon";

const SessionPage = () => {

    const session = useSelector((state: RootState) => state.session.selectedSession);
    const navigate = useNavigate();

    const [postActivty] = useLazyPostActivityQuery();
    const [getActivity] = useLazyGetActivityQuery();

    const token = useSelector((state: RootState) => state.auth.token);
    const userId = useSelector((state: RootState) => state.auth.userId);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [progressPercentage, setProgressPercentage] = useState<number>(0);
    const [startSession, setStartSession] = useState<boolean>(false);

    useEffect(() => {
        if (!session) {
            setTimeout(() => navigate("/home"), 1500);
        }
    }, []);

    const handleStartSession = async () => {
        if (session) {

            setStartSession(true);
        }

    }

    const handleTimeUpdate = () => {
        const audioElement = audioRef.current;
        if (audioElement) {
            const currentTime = audioElement.currentTime;
            const duration = audioElement.duration;

            if (duration) {
                const percentage = (currentTime / duration) * 100;
                setProgressPercentage(percentage);
            }
        }
    };

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

    const finishSession =  async () => {
        const now = DateTime.now();

        await postActivty({ token: token, body: { userId: userId, title: session.title, type: 1, date: now.toUTC().toString(), extra: { duration: `${session.duration.split(":")[0]} min` } } });
        await getActivity({ token: token, userId: userId });
        navigate(-1);
    }

    const isMediaEnded = progressPercentage > 92;
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
            {startSession ? (
                <Box>

                    <audio ref={audioRef} controls autoPlay onTimeUpdate={handleTimeUpdate}>
                        <source src={session.resource} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>

                    <Button
                        style={{ marginTop: '24px' }}
                        variant="contained"
                        color="primary"
                        className="session-button start-session-button"
                        onClick={() => isMediaEnded ? finishSession() : navigate(-1)}
                    >
                        {isMediaEnded ? 'Finish' : 'Cancel'}
                    </Button>
                    {
                        isMediaEnded && <Button
                            style={{ marginTop: '24px' }}
                            variant="contained"
                            color="primary"
                            className="session-button create-new-entry-button"
                            onClick={() => navigate("/new-entry")}
                        >
                            Create New Entry
                        </Button>
                    }
                </Box>
            ) : (
                <Box> <Typography
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

                </Box>
            )}
        </Box>
    )
}

export default SessionPage;
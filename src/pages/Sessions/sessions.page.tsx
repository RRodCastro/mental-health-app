import { Box, CircularProgress, Typography } from "@mui/material";
import SearchComponent from "../../components/search.component";
import BackComponent from "../../components/back/back.component";
import { SessionInterface } from "../../services/interfaces/sessions.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { setSelectedSession } from "../../services/sessions";
import { useNavigate } from "react-router-dom";
import { useGetSessionQuery } from "../../services/sessions.api";
const Sessions = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state: RootState) => state.auth.token);

    const {
        data,
        isLoading,
    } = useGetSessionQuery({ token: token });

    if (isLoading) {
        return <CircularProgress size={60} />

    }
    return (
        <Box className="sessions">
            <BackComponent />

            <Typography style={{ marginTop: '24px' }} variant="h2">
                Sessions
            </Typography>
            <SearchComponent />
            <Box className="sessions-container">
                {
                    (data || []).map((session: SessionInterface) => {
                        return (
                            <Box
                                onClick={() => {
                                    dispatch(setSelectedSession(session));
                                    navigate(`/session/${session.id}`);

                                }}
                                key={session.id} className="session-item">

                                <Typography className="session-item-title" variant="h5">{session.title}</Typography>
                                <Box
                                    className="session-item-image"
                                    component="img"
                                    src={session.image}
                                />
                                <Typography className="session-item-description">{session.description}</Typography>
                                <Typography className="session-item-duration" >Duration: {session.duration}</Typography>
                            </Box>
                        )
                    })

                }
            </Box>
        </Box>
    )


}

export default Sessions;
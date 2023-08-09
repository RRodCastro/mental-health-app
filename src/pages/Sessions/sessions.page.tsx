import { Box, Typography } from "@mui/material";
import SearchComponent from "../../components/search.component";
import BackComponent from "../../components/back/back.component";
import { Session } from "../../services/interfaces/sessions.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { setSelectedSession } from "../../services/sessions";
import { useNavigate } from "react-router-dom";
const Sessions = () => {

    const mindfullnessSessions = useSelector((state: RootState) => state.session.sessions);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Box className="sessions">
            <BackComponent />

            <Typography style={{ marginTop: '24px' }} variant="h2">
                Sessions
            </Typography>
            <SearchComponent />
            <Box className="sessions-container">
                {
                    mindfullnessSessions.map((session: Session) => {
                        return (
                            <Box
                                onClick={() => {                                         dispatch(setSelectedSession(session));
                                    navigate(`/session/${session.key}`);

                                }}
                                key={session.key} className="session-item">

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
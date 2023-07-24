import { Box, Typography } from "@mui/material";
import SearchComponent from "../../components/search.component";
import BackComponent from "../../components/back/back.component";
import { Session } from "../../services/interfaces/sessions.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
const Sessions = () => {

    const mindfullnessSessions = useSelector((state: RootState) => state.session.sessions);

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
                            <Box key={session.key} className="session-item">

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
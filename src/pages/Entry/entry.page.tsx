import { Box, Typography } from "@mui/material";
import BackComponent from "../../components/back/back.component";
import { LocalOffer } from "@mui/icons-material";
import { useSelector } from 'react-redux'
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../../services/store";
import { emotionIcons } from "../../services/interfaces/journaling.interface";
import { DateTime } from "luxon";
import { useGetActivityQuery } from "../../services/activity.api";

const EntryPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const token = useSelector((state: RootState) => state.auth.token);
    const userId = useSelector((state: RootState) => state.auth.userId);

    const {
        data: activityData,
    } = useGetActivityQuery({ token: token, userId: userId });

    const journalEntry = useSelector((state: RootState) => state.journal.selectedEntry);
    useEffect(() => {
        if (!journalEntry) {
            setTimeout(() => navigate("/home"), 1500);
        }
    }, []);


    if (!journalEntry) {
        return (
            <Box className="entry-container">
                <BackComponent />

                <Typography style={{ textAlign: 'center', marginTop: '60px' }} variant="h5">
                    Please select a journal entry
                </Typography>
            </Box>

        );
    }
    const date = DateTime.fromISO(journalEntry.date, { zone: "UTC"}).toLocal();
    const handleDelete = () => {
        const { id } = journalEntry;
        // lazy delete etnries
        navigate("/home");
        const keyActivity = activityData?.find((t) => t.entry === journalEntry.id)
        if (keyActivity) {
         // lazy delete activity
        }
    }

    return (
        <Box className="entry-container">
            <BackComponent />

            <Box className="entry-container-date">
                <Typography
                    variant="h5" className="entry-container-date-day">
                    {date.toFormat('LLLL dd, yyyy')}
                </Typography>
                <Box className="entry-container-emotion">
                {emotionIcons[journalEntry.mood] ? emotionIcons[journalEntry.mood].icon : null }

                <Typography className="entry-container-date-hour">
                    {date.toFormat('HH:mm')}
                </Typography>
                </Box>
            </Box>


            {<Box className="entry-container-tags">
                {
                    (journalEntry.tags || []).map((tag) => {
                        return (
                            <Box key={journalEntry.key + tag} className="entry-container-tag">
                                <LocalOffer />
                                <Typography className="entry-container-tag-text">
                                    {tag}
                                </Typography>
                            </Box>
                        )
                    })
                }
            </Box>}
            <Box className="entry-container-description">
                <Typography className="entry-container-description-text">
                    {journalEntry.description}
                </Typography>
            </Box>
        </Box>
    )
}

export default EntryPage;
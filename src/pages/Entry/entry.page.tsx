import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from "@mui/material";
import BackComponent from "../../components/back/back.component";
import { LocalOffer } from "@mui/icons-material";
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../services/store";
import { emotionIcons } from "../../services/interfaces/journaling.interface";
import { DateTime } from "luxon";
import { useGetActivityQuery, useLazyDeleteActivityQuery, useLazyGetActivityQuery } from "../../services/activity.api";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useLazyDeleteEntryQuery, useLazyGetEntriesQuery } from "../../services/journaling.api";

const EntryPage = () => {

    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);
    const userId = useSelector((state: RootState) => state.auth.userId);
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const {
        data: activityData,
    } = useGetActivityQuery({ token: token, userId: userId });

    const [
        deleteActivity
    ] = useLazyDeleteActivityQuery();

    const [
        deleteEntry
    ] = useLazyDeleteEntryQuery();

    const journalEntry = useSelector((state: RootState) => state.journal.selectedEntry);
    useEffect(() => {
        if (!journalEntry) {
            setTimeout(() => navigate("/home"), 1500);
        }
    }, []);

    const [
        getActivity
    ] = useLazyGetActivityQuery();
    const [
        getEntries
    ] = useLazyGetEntriesQuery();

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
    const date = DateTime.fromISO(journalEntry.date, { zone: "UTC" }).toLocal();

    const handleDelete = async () => {
        const { id } = journalEntry;
        if (id) {
            setOpenDialog(false);
            setIsLoading(true);
            const data = await deleteEntry({ token, userId, entryId: id });
            if (data.isSuccess) {
                const activityId = activityData?.find((t) => t.entry === id)?.id;
                if (activityId) {
                    const data = await deleteActivity({ token, userId, activityId });
                    if (data.isSuccess) {
                        await getActivity({ token, userId });
                        await getEntries({ token, userId });

                        setIsLoading(false);
                        if (data.isSuccess) {
                            navigate("/home");
                        }
                    }
                }
            }
        }
    }

    if (isLoading) {
        return <CircularProgress size={60} />
    }

    return (
        <Box className="entry-container">
            <BackComponent />

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}

                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this entry?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={() => handleDelete()} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Box className="entry-container-date">
                <Box className="entry-container-actions">
                    <Typography
                        variant="h5" className="entry-container-date-day">
                        {date.toFormat('LLLL dd, yyyy')}
                    </Typography>
                    <DeleteOutlineOutlinedIcon
                        onClick={() => setOpenDialog(true)} color="warning" className="entry-container-actions-delete" fontSize="medium" />
                </Box>
                <Box className="entry-container-emotion">
                    {emotionIcons[journalEntry.mood] ? emotionIcons[journalEntry.mood].icon : null}

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
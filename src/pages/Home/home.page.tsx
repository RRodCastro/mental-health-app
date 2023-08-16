import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState, ReactElement, Ref, useEffect } from 'react';
import { Box, CircularProgress, Fab, Typography } from "@mui/material";
import SearchComponent from "../../components/search.component";
import JournalEntry from "../../components/journaling/journal.entry.component";
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { setSelectedEntry } from "../../services/journaling";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../services/store";
import { useGetEntriesQuery } from "../../services/journaling.api.tsx";
import { JournalEntryInterface } from "../../services/interfaces/journaling.interface.tsx";
import { useGetActivityQuery } from "../../services/activity.api.tsx";
import { setIsUnauthorized } from "../../services/auth.tsx";


const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Home = () => {
    const { welcome } = useParams();
    const [open, setOpen] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);
    const userId = useSelector((state: RootState) => state.auth.userId);

    const isUnauthorized = useSelector((state: RootState) => state.auth.isUnauthorized);

    const {
        data,
        isLoading,
        isError: isEntriesError,
    } = useGetEntriesQuery({ token: token, userId: userId });

    const {
        data: activityData,
    } = useGetActivityQuery({ token: token, userId: userId });

    const handleClose = () => {
        localStorage.setItem("welcomeMessage", "1");
        setOpen(false);
    };

    const handleDeleteEntry = (id: string) => {
        // dispatch(deleteEntry({ token: token, userId: userId, entryId: id }));
        // dispatch(deleteEntry({ token: token, userId: userId, entryId: id }));

    }

    useEffect( () =>  {
        console.log(isEntriesError);
        if (isEntriesError ) {
          dispatch(setIsUnauthorized(true));
        
    } },
    [isEntriesError]);

    if (welcome && open && !localStorage.getItem("welcomeMessage")) {
        return (
            <Box className="home">
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                    className="welcome-dialog"
                >
                    <DialogTitle style={{ textAlign: 'center' }} variant="h4">{"Welcome!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ textAlign: 'center' }} id="alert-dialog-slide-description">
                            Welcome to a place where you can cultivate your well-being through journaling and guided meditations. As you prioritize your mental health, you will discover the power of self-reflection, find serenity, reduce stress, and enhance attention. Remember that you are not alone; we are here to help you every step of the way!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className="welcome-dialog-button-container">
                        <Button variant="contained" className="welcome-dialog-button" onClick={handleClose}>Let’s go</Button>
                    </DialogActions>
                </Dialog>
            </Box>

        )
    }
    if (isLoading) {
        return <CircularProgress size={60} />
    }

    return (
        <Box className="home">
            <Typography  style={{ marginTop: '24px' }} variant="h2">
                Home
            </Typography>
            <SearchComponent
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Box className="home-container">
                <Box className="entries-container">
                    {(data || [])?.length > 0 ? (data || []).filter((entry: JournalEntryInterface) => entry.tags?.join("").toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || entry.description.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())).map((entry: JournalEntryInterface) => {
                        return (
                            <JournalEntry
                                key={entry.id}
                                data={entry}
                                handleEntryClick={() => {
                                    dispatch(setSelectedEntry(entry));
                                    navigate('/entry');
                                }}
                            />
                        )
                    }): <Typography style={{ marginTop: '24px' }} variant="h5"> No entries yet. Click the + button to add one.</Typography>}
                </Box>
                <Fab onClick={() => navigate('/new-entry')} className="add-entry" aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>
        </Box>
    );
}

export default Home;
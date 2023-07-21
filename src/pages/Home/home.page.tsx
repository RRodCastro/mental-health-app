import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState, ReactElement, Ref } from 'react';
import { Box, Fab, Typography } from "@mui/material";
import SearchComponent from "../../components/search.component";
import JournalEntry from "../../components/journaling/journal.entry.component";
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { setSelectedEntry } from "../../services/journaling";
import { useDispatch } from 'react-redux'

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const entries = [
    {
        key: 'entry-0',
        date: new Date(),
        description: "I can't believe how quickly this semester has flown by. I'm already starting to feel anxious about the upcoming exams",
        tags: ["anxiety", "stress", "school"]
    },
    {
        key: 'entry-1',
        date: new Date(),
        description: "I had a rush morning but after walking in the nature I felt more calmed during the day which",
        tags: ["anxiety", "stress", "school"]


    },
    {
        key: 'entry-2',
        date: new Date(),
        description: "Today I felt very energetic during the morning but a call with a friend made feel...",
        tags: ["anxiety", "stress", "school"]


    },
    {
        key: 'entry-3',
        date: new Date(),
        description: "I can't believe how quickly this semester has flown by. I'm already starting to feel anxious about the upcoming exams",
        tags: ["anxiety", "stress", "school"]
    },
    {
        key: 'entry-4',
        date: new Date(),
        description: "I had a rush morning but after walking in the nature I felt more calmed during the day which",
        tags: ["anxiety", "stress", "school"]


    },
    {
        key: 'entry-5',
        date: new Date(),
        description: "Today I felt very energetic during the morning but a call with a friend made feel...",
        tags: ["anxiety", "stress", "school"]


    },
    {
        key: 'entry-6',
        date: new Date(),
        description: "I can't believe how quickly this semester has flown by. I'm already starting to feel anxious about the upcoming exams",
        tags: ["anxiety", "stress", "school"]
    },
    {
        key: 'entry-7',
        date: new Date(),
        description: "I had a rush morning but after walking in the nature I felt more calmed during the day which",
        tags: ["anxiety", "stress", "school"]


    },
    {
        key: 'entry-8',
        date: new Date(),
        description: "Today I felt very energetic during the morning but a call with a friend made feel...",
        tags: ["anxiety", "stress", "school"]


    }
];

const Home = () => {

    const { welcome } = useParams();
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleClose = () => {
        localStorage.setItem("welcomeMessage", "1");
        setOpen(false);
    };

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

    return (
        <Box className="home">
            <Typography variant="h2">
                Home
            </Typography>
            <SearchComponent />
            <Box className="home-container">
                <Box className="entries-container">
                    {entries.map((entry) => {
                        return (
                            <JournalEntry
                                key={entry.key}
                                data={entry}
                                handleEntryClick={() => {
                                    dispatch(setSelectedEntry(entry));
                                    navigate('/entry');
                                }}
                            />
                        )
                    })}
                </Box>
                <Fab onClick={() => navigate('/new-entry')} className="add-entry" aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>
        </Box>
    );
}

export default Home;
import { Box, Button, Fab, TextField, Typography } from "@mui/material";
import BackComponent from "../../components/back.component";
import { useNavigate } from "react-router-dom";
import { LocalOffer, LocalOfferOutlined } from '@mui/icons-material';

const NewEntry = () => {
    const navigate = useNavigate();

    // create a function to handle the click event
    const handleClick = () => {
        // navigate to the new entry page
        navigate('/home');
    }

    return (
        <Box className="new-entry">
            <BackComponent />
            <Box className="new-entry-container">
                <Typography variant="h3">
                    New Entry
                </Typography>
                <TextField
                    className="new-entry-text-field"
                    id="new-entry-text-field"
                    label="New Entry"
                    placeholder="Start asking yourself these questions: How did today's experiences make you feel? What were the highlights or challenges of your day? What lessons or insights did you gain from today?"

                    multiline
                    rows={20}
                    fullWidth
                />
                <Fab onClick={() => navigate('/new-entry')} className="add-label" aria-label="add-label">
                    <LocalOfferOutlined
                    fontSize="large"
                    />
                </Fab>
                <Button
                    onClick={handleClick}
                    style={{ backgroundColor: 'red' }}
                    variant="contained" className="new-entry-button" disableElevation>
                    Save
                </Button>
            </Box>

        </Box>

    )
};

export default NewEntry;
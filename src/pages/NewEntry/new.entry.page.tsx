import { Box, Button, Fab, IconContainerProps, Rating, TextField, Typography, styled } from "@mui/material";
import BackComponent from "../../components/back/back.component";
import { useNavigate } from "react-router-dom";
import { LocalOfferOutlined } from '@mui/icons-material';
import TagsModal from "../../components/tags-modal/tags.component";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addNewEntry } from "../../services/journaling";
import { emotionIcons } from "../../services/interfaces/journaling.interface";

const customIcons: {
    [index: string]: {
        icon: React.ReactElement;
        label: string;
    };
} = emotionIcons;

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

const IconContainer = (props: IconContainerProps) => {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}
const NewEntry = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        navigate('/home');
        dispatch(addNewEntry({ date: new Date(), description, tags, mood: emotion }))
    }

    const [tagsModalOpened, setTagsModal] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [description, setDescription] = useState<string>("");
    const [emotion, setEmotion] = useState<number>(3);

    return (
        <Box className="new-entry">
            <BackComponent />
            <TagsModal storeTags={(storeTags: string[]) => setTags(storeTags)} shouldDisplay={tagsModalOpened} hideModal={() => setTagsModal(false)} />

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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Box className="emotions-container">
                    <StyledRating
                        size="large"
                        name="highlight-selected-only"
                        defaultValue={3}
                        IconContainerComponent={IconContainer}
                        getLabelText={(value: number) => customIcons[value].label}
                        highlightSelectedOnly
                        value={emotion}
                        onChange={(_, newValue) => {
                            newValue && setEmotion(newValue as number);
                        }}
                    />
                </Box>

                <Fab onClick={() => setTagsModal(true)} className="add-label" aria-label="add-label">
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
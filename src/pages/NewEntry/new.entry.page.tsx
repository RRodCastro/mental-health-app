import { Alert, Box, Button, CircularProgress, Fab, IconContainerProps, Rating, TextField, Typography, styled } from "@mui/material";
import BackComponent from "../../components/back/back.component";
import { useNavigate } from "react-router-dom";
import { LocalOfferOutlined } from '@mui/icons-material';
import TagsModal from "../../components/tags-modal/tags.component";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { emotionIcons } from "../../services/interfaces/journaling.interface";
import { useLazyGetEntriesQuery, useLazyPostEntryQuery } from "../../services/journaling.api";
import { RootState } from "../../services/store";
import { DateTime } from "luxon";
import { useLazyRegisterQuery } from "../../services/auth.api";
import { useGetActivityQuery, useLazyGetActivityQuery, useLazyPostActivityQuery } from "../../services/activity.api";

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
    const [postEntry, { isLoading, isError ,error }] = useLazyPostEntryQuery();
    const [postActivty] = useLazyPostActivityQuery();

    const [getEntries] = useLazyGetEntriesQuery();
    const [getActivity] = useLazyGetActivityQuery();

    const token = useSelector((state: RootState) => state.auth.token);
    const userId = useSelector((state: RootState) => state.auth.userId);
    const [isFetchingData, setIsFetchingData] = useState(false);

    const handleClick = async () => {
        const now = DateTime.now();
        const data = await postEntry({ token: token, body: { userId: userId, date: now.toUTC().toString(), description, tags, mood: emotion } });
        if (data.isSuccess) {
            setIsFetchingData(true);
            await postActivty({  token: token, body: { userId: userId,  title: "Journal Entry", type: 0, date: now.toUTC().toString(), extra: { labels: tags } }});
            await getEntries({ token: token, userId: userId });
            await getActivity({ token: token, userId: userId });
            setIsFetchingData(false);

            navigate('/home');
        }
    }

    const [tagsModalOpened, setTagsModal] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [description, setDescription] = useState<string>("");
    const [emotion, setEmotion] = useState<number>(3);

    if (isLoading || isFetchingData) {
        return <CircularProgress size={60} />
    }
 
    return (
        <Box className="new-entry">
            <BackComponent />
            <TagsModal storeTags={(storeTags: string[]) => setTags(storeTags)} shouldDisplay={tagsModalOpened} hideModal={() => setTagsModal(false)} />

            <Box className="new-entry-container">
                <Typography variant="h3">
                    New Entry
                </Typography>
                {isError && <Alert severity="error">{`An error ocurr:  ${error && error.data.error.message}`}</Alert>}

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
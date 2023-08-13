import { Box, Typography } from "@mui/material"
import { JournalEntryInterface, emotionIcons } from "../../services/interfaces/journaling.interface";
import { DateTime } from "luxon";


const JournalEntry = ({ data, handleEntryClick }: { data: JournalEntryInterface, handleEntryClick: (data: JournalEntryInterface) => void }) => {

    const date = DateTime.fromISO(data.date, { zone: "UTC" }).toLocal();

    return (
        <Box
            onClick={() => handleEntryClick(data)}
            className="journal-entry">
            <Box className="journal-entry-date">
                <Typography fontWeight="600">
                    {date.toFormat('HH:mm')}
                </Typography>
                <Typography style={{ opacity: 0.7 }}>
                    {date.toFormat('LLLL dd, yyyy')}
                </Typography>
            </Box>
            <Box className="journal-entry-description">
                <Typography style={{ textAlign: 'initial' }}>
                    {data.description}
                </Typography>
                {emotionIcons[data.mood] ? emotionIcons[data.mood].icon : null}
            </Box>


        </Box>
    )
}

export default JournalEntry;
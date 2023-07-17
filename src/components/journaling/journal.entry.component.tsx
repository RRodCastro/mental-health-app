import { Box, Typography } from "@mui/material"
import { DateTime } from 'luxon';

export interface JournalEntry {
    date: Date,
    description: string,
    tags: String[],
}


const JournalEntry = (props: JournalEntry) => {
    return (
        <Box className="journal-entry">
            <Box className="journal-entry-date">
            <Typography fontWeight="600">
                18:42
            </Typography>
            <Typography style={{opacity: 0.7}}>
                April 30, 2023
            </Typography>
            </Box>
            <Typography>
                {props.description}
            </Typography>
        </Box>
    )
}

export default JournalEntry;
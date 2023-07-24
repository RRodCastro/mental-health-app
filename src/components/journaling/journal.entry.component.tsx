import { Box, Typography } from "@mui/material"

export interface JournalEntry {
    date: Date,
    description: string,
    tags: String[],
}

const JournalEntry = ({ data, handleEntryClick }: { data: JournalEntry, handleEntryClick: (data: JournalEntry) => void }) => {
    return (
        <Box
            onClick={() => handleEntryClick(data)}
            className="journal-entry">
            <Box className="journal-entry-date">
                <Typography fontWeight="600">
                    18:42
                </Typography>
                <Typography style={{ opacity: 0.7 }}>
                    April 30, 2023
                </Typography>
            </Box>
            <Typography style={{textAlign: 'initial'}}>
                {data.description}
            </Typography>
        </Box>
    )
}

export default JournalEntry;
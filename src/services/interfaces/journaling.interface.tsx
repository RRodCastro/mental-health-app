import { SentimentVeryDissatisfied, SentimentSatisfied, SentimentVerySatisfied, SentimentDissatisfied, SentimentSatisfiedAlt } from '@mui/icons-material';

export const emotionIcons = {
    1: {
        icon: <SentimentVeryDissatisfied color="error" />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfied color="error" />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfied color="warning" />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAlt color="success" />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfied color="success" />,
        label: 'Very Satisfied',
    },
};

export interface JournalEntry {
    key: string;
    date: Date;
    description: string;
    tags?: string[];
    mood: number,

}

export interface JournalingStateInterface { 
    entries: JournalEntry[];
    selectedEntry: JournalEntry | null;
    selectedKeysFromCalendar: string[];
}
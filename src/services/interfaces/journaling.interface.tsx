

export interface JournalEntry {
    key: string;
    date: Date;
    description: string;
    tags: string[];

}

export interface JournalingStateInterface { 
    entries: JournalEntry[];
    selectedEntry: JournalEntry | null;
    selectedKeysFromCalendar: string[];
}
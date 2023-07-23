import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Typography } from '@mui/material'
import { FiberManualRecord, LocalOffer } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedEntry, setSelectedKeysFromCalendar } from '../../services/journaling';
import BackComponent from '../../components/back/back.component';
import { useNavigate } from "react-router-dom";
import { RootState } from '../../services/store';
import { JournalEntry } from '../../services/interfaces/journaling.interface';
import { EventContentArg } from '@fullcalendar/core/index.js';



// Transoform the events to group them by date
const groupEventsByDate = (journalEntry: JournalEntry[]) => {
    const groupedEntries = journalEntry.reduce((accumulator, event) => {
        const eventDate = event.date.toISOString().slice(0, 10);

        const existingDateIndex = accumulator.findIndex(
            (group) => group && group['date'] === eventDate
        );

        if (existingDateIndex !== -1) {
            accumulator[existingDateIndex].keys.push(event.key);
        } else {
            accumulator.push({ date: eventDate, keys: [event.key] });
        }

        return accumulator;
    }, []);

    return groupedEntries;
}

const CalendarPage = () => {
    const dispatch = useDispatch();
    const selectedKeysFromCalendar = useSelector((state: RootState) => state.journal.selectedKeysFromCalendar);
    const navigate = useNavigate();
    const entries = useSelector((state: RootState) => state.journal.entries);

    const renderEventContent = (eventInfo: EventContentArg) => {

        return (
            <Box className="calendar-entry">
                <FiberManualRecord />
                <Typography>
                    + {eventInfo.event.extendedProps.keys.length}
                </Typography>
            </Box>
        )
    }

    return (
        <Box className="calendar-container">
            <BackComponent />
            <Box className="calendar-container-full-calendar">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                weekends={true}
                events={groupEventsByDate(entries)}
                eventContent={renderEventContent}
                height={"auto"}
                headerToolbar={
                    {
                        start: 'title',
                        center: '',
                        end: 'prev,next',
                    }
                }

                eventClick={(eventInfo) => {
                    dispatch(setSelectedKeysFromCalendar(eventInfo.event.extendedProps.keys));

                }}
            />
            </Box>
            {selectedKeysFromCalendar && selectedKeysFromCalendar.length > 0 &&
                <Box className="calendar-entry-info-container">
                    {
                        // From the first selected key, find the event and display the info of the date
                        entries.find((journalEntry: JournalEntry) => journalEntry.key === selectedKeysFromCalendar[0]) &&
                        <Box className="calendar-entry-info-date">
                            <Typography>
                                { entries.find((event) => event.key === selectedKeysFromCalendar[0]).date.toDateString()}
                            </Typography>
                        </Box>
                    }
                    {
                        selectedKeysFromCalendar.map((key) => {
                            const entry = entries.find((event) => event.key === key);
                            return (
                                <Box
                                    onClick={() => {
                                        dispatch(setSelectedEntry(entry));
                                        navigate(`/entry`);
                                    }}
                                    key={key} className="calendar-entry-info">
                                    <Box className="calendar-entry-info-header">
                                        <FiberManualRecord />
                                        <Typography className="calendar-entry-info-text">
                                            {entry.description}
                                        </Typography>
                                    </Box>

                                    <Box className="calendar-entry-tags">
                                        {
                                            entry && entry.tags.map((tag) => {
                                                return (
                                                    <Box key={entry.key + tag} className="calendar-entry-tags-tag">
                                                        <LocalOffer />
                                                        <Typography className="calendar-entry-tags-tag-text">
                                                            {tag}
                                                        </Typography>
                                                    </Box>
                                                )
                                            })
                                        }
                                    </Box>

                                </Box>
                            )
                        }
                        )
                    }
                </Box>}
        </Box>
    )
}

export default CalendarPage;
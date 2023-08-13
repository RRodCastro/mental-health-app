import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, CircularProgress, Typography } from '@mui/material'
import {  LocalOffer } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedEntry, setSelectedKeysFromCalendar } from '../../services/journaling';
import BackComponent from '../../components/back/back.component';
import { useNavigate } from "react-router-dom";
import { RootState } from '../../services/store';
import { JournalEntryInterface, emotionIcons } from '../../services/interfaces/journaling.interface';
import { EventContentArg } from '@fullcalendar/core/index.js';
import { useGetEntriesQuery } from '../../services/journaling.api';
import { formatISODate } from '../../utils/utils';



// Transoform the events to group them by date
const groupEventsByDate = (journalEntry: JournalEntryInterface[]) => {
    const groupedEntries = journalEntry.reduce((accumulator, event) => {
        const eventDate = event.date.split('T')[0];

        const existingDateIndex = accumulator.findIndex(
            (group) => group && group['date'] === eventDate
        );

        if (existingDateIndex !== -1) {
            accumulator[existingDateIndex].keys.push(event.id);
            accumulator[existingDateIndex].emotion.push(event.mood);

        } else {
            accumulator.push({ date: eventDate, keys: [event.id], emotion: [event.mood] });
        }

        return accumulator;
    }, []);

    return groupedEntries;
}

const calculateAverageEmotion = (emotions: number[]): number => {
    // Check if the emotions array is not empty
    if (emotions.length === 0) {
      return 3;
    }
      const sum = emotions.reduce((acc, emotion) => acc + emotion, 0);
  
    const averageEmotion = sum / emotions.length;
  
    return Math.round(averageEmotion);
  }
const CalendarPage = () => {
    const dispatch = useDispatch();
    const selectedKeysFromCalendar = useSelector((state: RootState) => state.journal.selectedKeysFromCalendar);
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);
    const userId = useSelector((state: RootState) => state.auth.userId);

    const {
        data,
        isLoading,
      } = useGetEntriesQuery({ token: token, userId: userId });

    const renderEventContent = (eventInfo: EventContentArg) => {
        // Get the average emotion
        const average = calculateAverageEmotion(eventInfo.event.extendedProps.emotion);

        return (
            <Box className="calendar-entry">
                {emotionIcons[average] ? emotionIcons[average].icon : null }
                <Typography>
                    + {eventInfo.event.extendedProps.keys.length}
                </Typography>
            </Box>
        )
    }
    if (isLoading) {
        return <CircularProgress size={60} />
    }

    return (
        <Box className="calendar-container">
            <BackComponent />
            <Box className="calendar-container-full-calendar">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                weekends={true}
                events={groupEventsByDate(data || [])}
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
                
                /* dayHeaders={false} */
            />
            </Box>
            {selectedKeysFromCalendar && selectedKeysFromCalendar.length > 0 &&
                <Box className="calendar-entry-info-container">
                    {
                        // From the first selected key, find the event and display the info of the date
                        (data || []).find((journalEntry: JournalEntryInterface) => journalEntry.id === selectedKeysFromCalendar[0]) &&
                        <Box className="calendar-entry-info-date">
                            <Typography>
                                { formatISODate((data || []).find((event) => event.id === selectedKeysFromCalendar[0] ).date)}
                            </Typography>
                        </Box>
                    }
                    {
                        selectedKeysFromCalendar.map((key) => {
                            const entry : JournalEntryInterface | undefined = (data || []).find((event) => event.id === key);
                            return (
                                <Box
                                    onClick={() => {
                                        dispatch(setSelectedEntry(entry));
                                        navigate(`/entry`);
                                    }}
                                    key={key} className="calendar-entry-info">
                                    <Box className="calendar-entry-info-header">
                                        {emotionIcons[entry.mood] ? emotionIcons[entry.mood].icon : null }

                                        <Typography className="calendar-entry-info-text">
                                            {entry?.description}
                                        </Typography>
                                    </Box>

                                    <Box className="calendar-entry-tags">
                                        {
                                            entry && entry.tags && (entry.tags || []).map((tag) => {
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
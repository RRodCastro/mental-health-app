import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Typography } from '@mui/material'
import { DateTime } from 'luxon'
import { FiberManualRecord, LocalOffer } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedEntry, setSelectedKeysFromCalendar } from '../../services/journaling';
import BackComponent from '../../components/back/back.component';
import { useNavigate } from "react-router-dom";

const yesterday = DateTime.local().minus({ days: 1 });
const pastDay = DateTime.local().minus({ days: 3 });

const events = [
    {
        key: 'entry-0',
        date: new Date(),
        description: "I can't believe how quickly this semester has flown by. I'm already starting to feel anxious about the upcoming exams",
        tags: ["anxiety", "stress", "school"]
    },
    {
        key: 'entry-1',
        date: yesterday.toJSDate(),
        description: "I can't believe how quickly this semester has flown by. I'm already starting to feel anxious about the upcoming exams",
        tags: ["anxiety", "stress", "school"]
    },
    {
        key: 'entry-2',
        date: pastDay.toJSDate(),
        description: "I can't believe how quickly this semester has flown by. I'm already starting to feel anxious about the upcoming exams",
        tags: ["anxiety", "stress", "school"]
    },
    {
        key: 'entry-3',
        date: pastDay.toJSDate(),
        description: "I can't believe how quickly this semester has flown by. I'm already starting to feel anxious about the upcoming exams",
        tags: ["anxiety", "stress", "school"]
    },
    {
        key: 'entry-4',
        date: new Date(),
        description: "I can't believe how quickly this semester has flown by. I'm already starting to feel anxious about the upcoming exams",
        tags: ["anxiety", "stress", "school"]
    },
]

// Transoform the events to group them by date
function groupEventsByDate(events) {
    const groupedEvents = events.reduce((accumulator, event) => {
        const eventDate = event.date.toISOString().slice(0, 10);

        const existingDateIndex = accumulator.findIndex(
            (group) => group.date === eventDate
        );

        if (existingDateIndex !== -1) {
            accumulator[existingDateIndex].keys.push(event.key);
        } else {
            accumulator.push({ date: eventDate, keys: [event.key] });
        }

        return accumulator;
    }, []);

    return groupedEvents;
}

const CalendarPage = () => {
    const dispatch = useDispatch();
    const selectedKeysFromCalendar = useSelector(state => state.journal.selectedKeysFromCalendar);
    const navigate = useNavigate();

    const renderEventContent = (eventInfo: any) => {

        return (
            <Box className="calendar-entry">
                <FiberManualRecord  />
                <Typography>
                    + {eventInfo.event.extendedProps.keys.length}
                </Typography>
            </Box>
        )
    }

    return (
        <Box className="calendar-container">
            <BackComponent />
            <FullCalendar
                
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                weekends={true}
                events={groupEventsByDate(events)}
                eventContent={renderEventContent}
                height={"auto"}
                headerToolbar={
                    {
                        start: 'title',
                        center: '',
                        end: 'prev,next',
                    }
                }

                eventClick = {(eventInfo) => {
                      dispatch(setSelectedKeysFromCalendar(eventInfo.event.extendedProps.keys));
                    
                  }}
            />
            {selectedKeysFromCalendar && selectedKeysFromCalendar.length > 0 &&
            <Box className="calendar-entry-info-container">
                {
                    // From the first selected key, find the event and display the info of the date
                    events.find((event) => event.key === selectedKeysFromCalendar[0]) &&
                    <Box className="calendar-entry-info-date">
                        <Typography>
                            {events.find((event) => event.key === selectedKeysFromCalendar[0]).date.toDateString()}
                        </Typography>
                      </Box>  
                }
                {
                    selectedKeysFromCalendar.map((key) => {
                        const entry = events.find((event) => event.key === key);
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
                                        entry.tags.map((tag) => {
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
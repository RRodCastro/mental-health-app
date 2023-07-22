import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Typography } from '@mui/material'
import { DateTime } from 'luxon'
import { FiberManualRecord } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedKeysFromCalendar } from '../../services/journaling';

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
        date: yesterday.toJSDate() ,
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

    const renderEventContent = (eventInfo: any) => {
    
        return (
            <Box className="calendar-entry">
                <FiberManualRecord onClick={() => dispatch( setSelectedKeysFromCalendar(eventInfo.event.extendedProps.keys)) } />
                <Typography>
                    + {eventInfo.event.extendedProps.keys.length}
                </Typography>
            </Box>
        )
    }
    
    console.log("set Selecte " , selectedKeysFromCalendar);
    return (
        <Box>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                weekends={true}
                events={groupEventsByDate(events)}
                eventContent={renderEventContent}
                height={"auto"}
                headerToolbar={
                    {
                        start: 'title', // will normally be on the left. if RTL, will be on the right
                        center: '',
                        end: 'prev,next', // will normally be on the right. if RTL, will be on the left
                    }
                }
/*                 select={(e) => console.log("select ", e)}
                eventClick={(e) => { console.log("eventClick ", e.event.extendedProps)}} */
            />
        </Box>
    )
}

// setSelectedKeysFromCalendar

export default CalendarPage;
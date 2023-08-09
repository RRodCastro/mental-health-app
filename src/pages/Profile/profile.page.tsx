import { Box, Typography } from "@mui/material"
import BackComponent from "../../components/back/back.component";
import { DateTime } from 'luxon'
import {  BookOutlined, SelfImprovement } from "@mui/icons-material";

const yesterday = (DateTime.local().minus({ days: 1 }).toMillis());
const pastDay = (DateTime.local().minus({ days: 3 })).toMillis();

const activities = [
    {
        key: "sesssion-1",
        title: "Body Scan",
        type: 1,
        date: pastDay,
        extra: { duration: "12 min" }
    },
    {
        key: "sesssion-2",
        title: "Mindful Breathing",
        type: 1,
        date: pastDay,
        extra: { duration: "18 min" }
    },
    {
        key: "sesssion-2",
        title: "Journal Entry",
        type: 0,
        date: yesterday,
        extra: { labels: ["overview", "self-compassion"] }
    },
];

const ProfilePage = () => {
    return (
        <Box className="profile-container">
            <BackComponent />
            <Typography variant="h2">
                Profile
            </Typography>
            <Box className="logout-button" onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }}>
                <Typography>
                    Logout
                </Typography>
            </Box>

            <Box className="profile-activity">
                <Typography style={{fontWeight: 600}}>
                    Your activity
                </Typography>
                <Box className="profile-activity-container">
                    {
                        activities.map((activity) => (
                            <Box key={activity.key} className="profile-activity-item">

                                <Box className="profile-activity-item-icon" >
                                       {activity.type === 0 ? <BookOutlined /> : <SelfImprovement />}
                                </Box>
                                <Box className="profile-activity-item-description" >

                                    <Typography  className="profile-activity-item-title">
                                        {activity.title}
                                    </Typography>
                                    {activity.extra.duration && <Typography  className="profile-activity-item-duration">
                                        {activity.extra.duration}
                                    </Typography>}

                                    {activity.extra.labels && <Typography  className="profile-activity-item-labels">
                                        {activity.extra.labels.join(", ")}
                                    </Typography>}
                                </Box>
                                <Box className="profile-activity-item-date" >
                                    {activity.date && <Typography  className="profile-activity-item-date">
                                        {DateTime.fromMillis(activity.date).toRelative()}
                                    </Typography>}
                                </Box>
                            </Box>
                        )
                        )
                    }
                </Box>
            </Box>

        </Box>
    )
}

export default ProfilePage;
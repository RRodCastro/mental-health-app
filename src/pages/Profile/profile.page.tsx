import { Box, CircularProgress, Typography } from "@mui/material"
import BackComponent from "../../components/back/back.component";
import { DateTime } from 'luxon'
import { BookOutlined, SelfImprovement } from "@mui/icons-material";
import { deleteDataLocalStorage, formatISODate } from "../../utils/utils";
import { resetToken, resetUserId } from "../../services/auth";
import { useDispatch, useSelector } from 'react-redux'
import { useGetActivityQuery } from "../../services/activity.api";
import { RootState } from "../../services/store";
import { ActivityInterface } from "../../services/interfaces/activity.interface";

const yesterday = (DateTime.local().minus({ days: 1 }));
const pastDay = (DateTime.local().minus({ days: 3 }));

const activities = [
    {
        key: "sesssion-1",
        title: "Body Scan",
        type: 1,
        date: pastDay.toUTC().toString(),
        extra: { duration: "12 min" },
        userId: ''
    },
    {
        key: "sesssion-2",
        title: "Mindful Breathing",
        type: 1,
        date: yesterday.toUTC().toString(),
        extra: { duration: "18 min" },
        userId: ''
    },
];

const ProfilePage = () => {
    const dispatch = useDispatch();

    const token = useSelector((state: RootState) => state.auth.token);
    const userId = useSelector((state: RootState) => state.auth.userId);

    const {
        data,
        isLoading,
    } = useGetActivityQuery({ token: token, userId: userId });


    if (isLoading) {
        return <CircularProgress size={60} />

    }
    return (
        <Box className="profile-container">
            <BackComponent />
            <Typography variant="h2">
                Profile
            </Typography>
            <Box className="logout-button" onClick={() => {
                deleteDataLocalStorage();
                dispatch(resetUserId());
                dispatch(resetToken());

                window.location.href = "/login";
            }}>
                <Typography>
                    Logout
                </Typography>
            </Box>

            <Box className="profile-activity">
                <Typography style={{ fontWeight: 600 }}>
                    Your activity
                </Typography>
                <Box className="profile-activity-container">
                    {
                        ([...(data || []), ...activities]).map((activity: ActivityInterface) => (
                            <Box key={activity.id} className="profile-activity-item">

                                <Box className="profile-activity-item-icon" >
                                    {activity.type === 0 ? <BookOutlined /> : <SelfImprovement />}
                                </Box>
                                <Box className="profile-activity-item-description" >

                                    <Typography className="profile-activity-item-title">
                                        {activity.title}
                                    </Typography>
                                    {activity?.extra?.duration && <Typography className="profile-activity-item-duration">
                                        {activity.extra.duration}
                                    </Typography>}

                                    {activity?.extra?.labels && <Typography className="profile-activity-item-labels">
                                        {activity.extra.labels.join(", ")}
                                    </Typography>}
                                </Box>
                                <Box className="profile-activity-item-date" >
                                    {activity.date && <Typography className="profile-activity-item-date">
                                        {formatISODate(activity.date)}
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
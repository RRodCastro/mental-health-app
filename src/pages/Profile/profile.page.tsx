import { Box, CircularProgress, Typography } from "@mui/material"
import BackComponent from "../../components/back/back.component";
import { BookOutlined, SelfImprovement } from "@mui/icons-material";
import { deleteDataLocalStorage, formatISODate } from "../../utils/utils";
import { resetToken, resetUserId, setIsUnauthorized } from "../../services/auth";
import { useDispatch, useSelector } from 'react-redux'
import { useGetActivityQuery } from "../../services/activity.api";
import { RootState } from "../../services/store";
import { ActivityInterface } from "../../services/interfaces/activity.interface";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DateTime } from "luxon";
import { LocalFireDepartmentOutlined as FireIcon } from '@mui/icons-material';

const DAY = 60 * 60 * 24 * 1000;

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state: RootState) => state.auth.token);
    const userId = useSelector((state: RootState) => state.auth.userId);

    const {
        data,
        isLoading,
        isError: isActivityError,
    } = useGetActivityQuery({ token: token, userId: userId });


    useEffect(() => {
        if (isActivityError) {
            dispatch(setIsUnauthorized(true));

        }
    }, [isActivityError]);

    const getDateValue = (date: string) => {
        const parsedDate = DateTime.fromFormat(date, "dd.MM.yyyy");
        if (parsedDate.isValid) {
            return parsedDate.valueOf();
        } else {
            return -1;
        }
    }

    const calculateConsecutiveDays = (activity: { date: string }[]): number => {
        const yesterday = DateTime.now().plus({ day: - 1 }).toFormat("dd.MM.yyyy");


        const t = DateTime.fromISO(activity[0].date).toFormat("dd.MM.yyyy");


        if (activity.length === 0) {
            return 0;
        }
        const diff = (getDateValue(t) - getDateValue(yesterday)) / DAY;
        if (!(diff >= 0 && diff <= 1)) {
            return 0
        }
        let counter = 0;

        activity.forEach((item, index) => {
            if (index === 0) {
                return counter++;
            } else {
                const prevDate = getDateValue(DateTime.fromISO(activity[index - 1].date).toFormat("dd.MM.yyyy"));
                const currentDate = getDateValue(DateTime.fromISO(item.date).toFormat("dd.MM.yyyy"));
                if (currentDate === prevDate) {
                    return;
                }
                if (((prevDate - currentDate) / DAY) === 0 || ((prevDate - currentDate) / DAY) === 1) {
                    return counter++;
                }
            }
        })
        return counter;
    }

    if (isLoading) {
        return <CircularProgress size={60} />

    }

    const streak =  calculateConsecutiveDays(data || []);

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

                setTimeout(() => navigate('/login'), 500);
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
                        streak > 0 && <Box className="profile-activity-container-streak">
                            <FireIcon color="warning" />
                            <Typography>
                                {calculateConsecutiveDays(data || [])} days Streak! Keep going
                            </Typography>
                            </Box>

                    }
                       
                    {
                        (data || []).map((activity: ActivityInterface) => (
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

        </Box >
    )
}

export default ProfilePage;
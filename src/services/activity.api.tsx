import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ActivityInterface } from "./interfaces/activity.interface";

const activityApi = createApi({
    reducerPath: "activityApi",
    baseQuery: fetchBaseQuery({
    }),
    endpoints: (builder) => ({
        getActivity: builder.query({
            query: ({token, userId} : {token: string, userId: string}) => ({
                url: `${import.meta.env.VITE_REACT_APP_FIRESTORE_URL}/users/${userId}/activity.json?auth=${token}"`,
                method: 'GET',

            }),
            transformResponse: (data: any) : ActivityInterface[] => {
                if (data) {

                    const transformedData = Object.keys(data).map((key) => { return { id: key, ...data[key] } });
                    transformedData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
                    return transformedData;
                }
                return [];
            }
        }),
        postActivity: builder.query({
            query: ({body, token, userId}: {body: ActivityInterface, token: string, userId: string}) => ({
                url: `${import.meta.env.VITE_REACT_APP_FIRESTORE_URL}/users/${userId}/activity.json?auth=${token}`,
                method: 'POST',
                body: body
            }),
            transformResponse: (data: any) => {
                return data;
            },
        }),
        getActivityByEntry: builder.query({
            query: ({token, userId, entryId}: {body: ActivityInterface, token: string, userId: string, entryId: string}) => ({
                url: `${import.meta.env.VITE_REACT_APP_FIRESTORE_URL}/users/${userId}/activity.json?auth=${token}&orderBy="entry"&equalTo="${entryId}"`,
                method: 'GET'
            }),
            transformResponse: (data: any) => {
                return data;
            },
        }),
        deleteActivity: builder.query({
            query: ({token, userId, activityId}: { token: string, userId: string, activityId: string}) => ({
                url: `${import.meta.env.VITE_REACT_APP_FIRESTORE_URL}/users/${userId}/activity/${activityId}.json?auth=${token}`,
                method: 'DELETE',
            }),
            transformResponse: (data: any) => {
                return data;
            },
        }),
    })
});



export const { useGetActivityQuery, useLazyGetActivityQuery, useLazyPostActivityQuery, usePostActivityQuery, useLazyGetActivityByEntryQuery, useLazyDeleteActivityQuery } = activityApi;

export default activityApi;




import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JournalEntryInterface } from "./interfaces/journaling.interface";

const journalingApi = createApi({
    reducerPath: "journalingApi",
    baseQuery: fetchBaseQuery({
    }),
    endpoints: (builder) => ({
        getEntries: builder.query({
            query: ({token, userId} : {token: string, userId: string}) => ({
                url: `${import.meta.env.VITE_REACT_APP_FIRESTORE_URL}/${userId}/entries.json?auth=${token}"`,
                method: 'GET',

            }),
            transformResponse: (data: any) : JournalEntryInterface[] => {
                if (data) {
                    const transformedData = Object.keys(data).map((key) => { return { id: key, ...data[key] } });
                    transformedData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
                    return transformedData;
                }
                
                return [];
            }
        }),
        postEntry: builder.query({
            query: ({body, token, userId}: {body: JournalEntryInterface, token: string, userId: string}) => ({
                url: `${import.meta.env.VITE_REACT_APP_FIRESTORE_URL}/${userId}/entries.json?auth=${token}`,
                method: 'POST',
                body: body
            }),
            transformResponse: (data: any) => {
                return data;
            },
        }),
        deleteEntry: builder.query({
            query: ({token, userId, entryId}: {token: string, userId: string, entryId: string}) => ({
                url: `${import.meta.env.VITE_REACT_APP_FIRESTORE_URL}/${userId}/entries/${entryId}.json?auth=${token}`,
                method: 'DELETE'
            }),
            transformResponse: (data: any) => {
                return data;
            },
        }),
    })
});



export const { usePostEntryQuery, useLazyGetEntriesQuery, useLazyPostEntryQuery, useGetEntriesQuery, useLazyDeleteEntryQuery } = journalingApi;

export default journalingApi;




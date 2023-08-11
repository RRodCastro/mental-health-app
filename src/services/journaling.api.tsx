import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JournalEntryInterface } from "./interfaces/journaling.interface";

const journalingApi = createApi({
    reducerPath: "journalingApi",
    baseQuery: fetchBaseQuery({
    }),
    endpoints: (builder) => ({
        getEntries: builder.query({
            query: ({token, userId} : {token: string, userId: string}) => ({
                url: `${import.meta.env.VITE_REACT_APP_FIRESTORE_URL}/entries.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`,
                method: 'GET',

            }),
            transformResponse: (data: any) => {
                const transformedData = Object.keys(data).map((key) => { return { id: key, ...data[key] } });
                return transformedData;
            }
        }),
        postEntry: builder.query({
            query: ({body, token}: {body: JournalEntryInterface, token: string}) => ({
                url: `${import.meta.env.VITE_REACT_APP_FIRESTORE_URL}/entries.json?auth=${token}`,
                method: 'POST',
                body: body
            }),
            transformResponse: (data: any) => {
                return data;
            },
        }),
    })
});



export const { usePostEntryQuery, useLazyGetEntriesQuery, useLazyPostEntryQuery, useGetEntriesQuery } = journalingApi;

export default journalingApi;




import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SessionInterface } from "./interfaces/sessions.interface";

const sessionApi = createApi({
    reducerPath: "sessionApi",
    baseQuery: fetchBaseQuery({
    }),
    endpoints: (builder) => ({
        getSession: builder.query({
            query: ({token} : {token: string}) => ({
                url: `${import.meta.env.VITE_REACT_APP_FIRESTORE_URL}/session.json?auth=${token}"`,
                method: 'GET',

            }),
            transformResponse: (data: any) : SessionInterface[] => {
                const transformedData = Object.keys(data).map((key) => { return { id: key, ...data[key] } });

                return transformedData;
            }
        }),
    })
});



export const { useGetSessionQuery, useLazyGetSessionQuery } = sessionApi;

export default sessionApi;


import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const authSlice = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: `${''}https://jsonplaceholder.typicode.com`,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }),
    endpoints: (builder) => ({
        login: builder.query({
            query: () => ({
                url: "/posts",
                method: 'GET',
            }),
            transformResponse: (data) => {
                console.log("from transform" , data);
                return data;
            }
        })
    })
});


export const {useLoginQuery, useLazyLoginQuery} = authSlice;
export default authSlice;



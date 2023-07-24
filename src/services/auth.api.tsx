import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const authSlice = createApi({
    reducerPath: "authApi",
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
                localStorage.setItem('o0213saWmFO^', "token");
                return data;
            }
        })
    })
});


export const {useLoginQuery, useLazyLoginQuery} = authSlice;
export default authSlice;



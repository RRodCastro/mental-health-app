import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { saveDataLocalStorage } from "../utils/utils";


const authSlice = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `https://identitytoolkit.googleapis.com/v1/accounts`,
    }),
    endpoints: (builder) => ({
        login: builder.query({
            query: (body) => ({
                url: `:signInWithPassword?key=${import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY}`,
                method: 'POST',
                body: { ...body, returnSecureToken: true }

            }),
            transformResponse: (data: any) => {
                saveDataLocalStorage(data);

                return data;
            }
        }),
        register: builder.query({
            query: (body) => ({
                url: `:signUp?key=${import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY}`,
                method: 'POST',
                body: { ...body, returnSecureToken: true }
            }),
            transformResponse: (data: any) => {
                saveDataLocalStorage(data);
                return data;
            },

        }),
        refreshToken: builder.query({
            query: (body) => ({
                url: `:refreshToken?key=${import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY}`,
                method: 'POST',
                body: { ...body, grant_type: "refresh_token" }
            }),
            transformResponse: (data: any) => {
                saveDataLocalStorage(data);
                return data;
            }
        })
    })
});


const tokenSlice = createApi({
    reducerPath: "tokenApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `https://securetoken.googleapis.com/v1/token?key=${import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY}`,
    }),
    endpoints: (builder) => ({
        token: builder.query({
            query: (body) => ({
                url: "",
                method: 'POST',
                body: { ...body, grant_type: "refresh_token" }

            }),
            transformResponse: (data: any) => {
                saveDataLocalStorage(data);

                return data;
            }
        }),
    })
})

export const { useLoginQuery, useLazyLoginQuery, useLazyRegisterQuery, useRegisterQuery } = authSlice;
export const { useLazyTokenQuery, useTokenQuery } = tokenSlice;

export {authSlice , tokenSlice};




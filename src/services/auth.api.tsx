import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const saveLocalStorage = (data: any) => {
    const expirationDate = new Date().getTime() + parseInt(data.expiresIn) * 1000;

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('expirationDate', expirationDate.toString())
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('refreshToken', data.refreshToken);
}
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
                saveLocalStorage(data);

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
                saveLocalStorage(data);
                return data;
            },

        })
    })
});


export const { useLoginQuery, useLazyLoginQuery, useLazyRegisterQuery, useRegisterQuery } = authSlice;
export default authSlice;



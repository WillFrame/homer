import {createSlice} from '@reduxjs/toolkit';

export type Authorization = {
    token?: string;
};

const initialState: Authorization = {
    token: undefined,
};

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        setToken: (state, {payload}: {payload: string}) => {
            state.token = payload;
        },
    },
});

export const {setToken} = authorizationSlice.actions;

export default authorizationSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from "../store";

export interface AppState {
    loading: boolean,
    notification: string
}

const initialState: AppState = {
    loading: false,
    notification: ""
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setNotification: (state, action: PayloadAction<string>) => {
            state.notification = action.payload;
        },
    },
})

export const {setLoading, setNotification} = appSlice.actions;

export default appSlice.reducer;
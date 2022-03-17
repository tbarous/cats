import {configureStore} from "@reduxjs/toolkit";
import AppReducer from "./AppSlice";

const store = configureStore({
    reducer: {
        cats: AppReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
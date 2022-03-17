import {createAsyncThunk, createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {getAPI} from "../Api";

interface AppState {
    cats: [],
    loading: boolean
}

const initialState: AppState = {
    cats: [],
    loading: false
}

export const fetchCats = createAsyncThunk(
    'cats/fetchCats',
    async (page: number, thunkAPI) => {
        const response = await getAPI().getCats(page);

        return response.data;
    }
)

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCats.fulfilled, (state, action) => {
            state.cats = [...state.cats, ...action.payload];
            state.loading = false;
        })

        builder.addCase(fetchCats.pending, (state, action) => {
            state.loading = true;
        })
    },
})

export const {setLoading} = appSlice.actions;

export default appSlice.reducer;
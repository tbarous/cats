import {createAsyncThunk, createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {getAPI} from "../Api";
import Cat from "../models/Cat";

interface AppState {
    cats: Cat[] | [],
    cat: Cat | null,
    page: number,
    loading: boolean
}

const initialState: AppState = {
    cats: [],
    cat: null,
    page: 0,
    loading: false
}

export const fetchCats = createAsyncThunk(
    'app/fetchCats',
    async (page: number, thunkAPI) => {
        const response = await getAPI().getCats(page);

        return response.data;
    }
)

export const fetchCat = createAsyncThunk(
    'app/fetchCat',
    async (id: string, thunkAPI) => {
        const response = await getAPI().getCat(id);

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
        setCat: (state, action: PayloadAction<null | Cat>) => {
            state.cat = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCats.fulfilled, (state, action) => {
            state.cats = [...state.cats, ...action.payload];
            state.loading = false;
            state.page = state.page + 1;
        })

        builder.addCase(fetchCats.pending, (state, action) => {
            state.loading = true;
        })

        builder.addCase(fetchCat.fulfilled, (state, action) => {
            state.cat = action.payload;
            state.loading = false;
        })

        builder.addCase(fetchCat.pending, (state, action) => {
            state.loading = true;
        })
    },
})

export const {setLoading, setCat} = appSlice.actions;

export default appSlice.reducer;
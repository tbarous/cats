import {createAsyncThunk, createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {getAPI} from "../Api";
import Cat from "../models/Cat";
import Breed from "../models/Breed";

interface AppState {
    cats: Cat[] | [],
    cat: Cat | null,
    page: number,
    loading: boolean,
    breeds: Breed[],
    breed: Breed | null,
    breedCats: any
}

const initialState: AppState = {
    cats: [],
    cat: null,
    page: 0,
    loading: false,
    breeds: [],
    breed: null,
    breedCats: []
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

export const fetchBreeds = createAsyncThunk(
    'app/fetchBreeds',
    async (thunkAPI) => {
        const response = await getAPI().getBreeds();

        return response.data;
    }
)

export const searchByBreed = createAsyncThunk(
    'app/searchByBreed',
    async (id: string, thunkAPI) => {
        const response = await getAPI().getByBreed(id);

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
        setBreed: (state, action: PayloadAction<Breed | null>) => {
            state.breed = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Fetch the cats
        builder.addCase(fetchCats.fulfilled, (state, action) => {
            state.cats = [...state.cats, ...action.payload];
            state.loading = false;
            state.page = state.page + 1;
        })

        builder.addCase(fetchCats.pending, (state, action) => {
            state.loading = true;
        })

        // Fetch the cat
        builder.addCase(fetchCat.fulfilled, (state, action) => {
            state.cat = action.payload;
            state.loading = false;
        })

        builder.addCase(fetchCat.pending, (state, action) => {
            state.loading = true;
        })

        // Fetch the breeds
        builder.addCase(fetchBreeds.fulfilled, (state, action) => {
            state.breeds = action.payload;
            state.loading = false;
        })

        builder.addCase(fetchBreeds.pending, (state, action) => {
            state.loading = true;
        })

        // Search by breed
        builder.addCase(searchByBreed.fulfilled, (state, action) => {
            state.breedCats = action.payload;
            state.loading = false;
        })

        builder.addCase(searchByBreed.pending, (state, action) => {
            state.loading = true;
        })
    },
})

export const {setLoading, setCat, setBreed} = appSlice.actions;

export default appSlice.reducer;
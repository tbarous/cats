import {createAsyncThunk, createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {Game} from "../components/browser/Games";
import axios from "axios";

interface GamesState {
    cats: []
}

const initialState: GamesState = {
    cats: []
}

export const fetchCats = createAsyncThunk(
    'cats/fetchCats',
    async (userId, thunkAPI) => {
        const url = "";

        const response = await axios.get(url);

        return response.data
    }
)

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setSort: (state, action: PayloadAction<boolean>) => {
            state.sort = action.payload;
        },
        setVendor: (state, action: PayloadAction<string>) => {
            state.vendor = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        reset: (state) => {
            state.search = "";
            state.vendor = "";
            state.sort = false
        },
        filter: (state) => {
            let result = [...state.games];

            if (state.search) {
                result = result.filter((game: Game) => game.title.toLowerCase().indexOf(state.search.toLowerCase()) !== -1);
            }

            if (state.sort) {
                result = result.sort((a, b) => a.title.localeCompare(b.title));
            }

            if (state.vendor) {
                result = result.filter((game: Game) => game.vendor === state.vendor);
            }

            state.gamesFiltered = result;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGames.fulfilled, (state, action) => {
            state.games = action.payload;
            state.gamesFiltered = action.payload;
            state.vendors = [...new Set(state.games.map(game => game.vendor))];
        })
    },
})

export const {setSort, setSearch, setVendor, filter, reset} = gamesSlice.actions;

export default gamesSlice.reducer;
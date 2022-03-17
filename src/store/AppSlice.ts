import {createAsyncThunk, createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {getAPI} from "../Api";
import Cat from "../models/Cat";
import Breed from "../models/Breed";
import Favorite from "../models/Favorite";

interface AppState {
    cats: Cat[] | [],
    cat: Cat | null,
    page: number,
    loading: boolean,
    breeds: Breed[],
    breed: Breed | null,
    breedCats: Cat[],
    favorites: Favorite[],
    notification: string
}

const initialState: AppState = {
    cats: [],
    cat: null,
    page: 0,
    loading: false,
    breeds: [],
    breed: null,
    breedCats: [],
    favorites: [],
    notification: ""
}

export const fetchCats = createAsyncThunk(
    'app/fetchCats',
    async (arg, {getState}) => {
        const {page} = getState();

        console.log(page)

        const response = await getAPI().getCats(page + 1);

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

export const fetchFavorites = createAsyncThunk(
    'app/fetchFavorites',
    async (arg, thunkAPI) => {
        const response = await getAPI().getFavorites();

        return response.data;
    }
)

export const like = createAsyncThunk(
    'app/like',
    async (cat: Cat, thunkAPI) => {
        const response = await getAPI().like(cat.id);

        return {status: response.status, cat};
    }
)

export const removeFromFavorites = createAsyncThunk(
    'app/removeFromFavorites',
    async (cat: Favorite, thunkAPI) => {
        const response = await getAPI().removeFromFavorites(cat.id);

        return cat;
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
        setBreedCats: (state, action: PayloadAction<Cat[] | []>) => {
            state.breedCats = action.payload;
        },
        setNotification: (state, action: PayloadAction<string>) => {
            state.notification = action.payload;
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

        // Like
        builder.addCase(like.fulfilled, (state, action) => {
            if (action.payload.status !== 400) {
                state.favorites = [...state.favorites, action.payload.cat];

                state.notification = "Added cat to favorites!";
            } else {
                state.notification = "Cat already exists in favorites!";
            }

            state.loading = false;
        })

        builder.addCase(like.pending, (state, action) => {
            state.loading = true;
        })

        // Get Favorites
        builder.addCase(fetchFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload;

            state.loading = false;
        })

        builder.addCase(fetchFavorites.pending, (state, action) => {
            state.loading = true;
        })

        // Remove from favorites
        builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
            state.favorites = state.favorites.filter((favorite: Favorite) => favorite.id !== action.payload.id);

            state.loading = false;
        })

        builder.addCase(removeFromFavorites.pending, (state, action) => {
            state.loading = true;
        })
    },
})

export const {setLoading, setCat, setBreed, setBreedCats, setNotification} = appSlice.actions;

export default appSlice.reducer;
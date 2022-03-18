import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from "../store";
import Favorite from "../../models/Favorite";
import {addToFavorites, fetchFavorites, removeFromFavorites} from "../actions/FavoritesActions";
import {
    addToFavoritesFulfilled,
    addToFavoritesPending,
    fetchFavoritesFulfilled,
    fetchFavoritesPending,
    removeFromFavoritesFulfilled,
    removeFromFavoritesPending
} from "../cases/FavoritesCases";

export interface FavoritesState {
    favorites: Favorite[],
}

const initialState: FavoritesState = {
    favorites: []
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToFavorites.fulfilled, addToFavoritesFulfilled);
        builder.addCase(addToFavorites.pending, addToFavoritesPending);
        builder.addCase(fetchFavorites.fulfilled, fetchFavoritesFulfilled)
        builder.addCase(fetchFavorites.pending, fetchFavoritesPending)
        builder.addCase(removeFromFavorites.fulfilled, removeFromFavoritesFulfilled)
        builder.addCase(removeFromFavorites.pending, removeFromFavoritesPending)
    },
})

export const {} = favoritesSlice.actions;

export default favoritesSlice.reducer;
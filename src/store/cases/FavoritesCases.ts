import Favorite from "../../models/Favorite";
import {FavoritesState} from "../slices/FavoritesSlice";

export function removeFromFavoritesFulfilled(state: FavoritesState, action: { payload: any }) {
    state.favorites = state.favorites.filter((favorite: Favorite) => favorite.id !== action.payload.id);
}

export function addToFavoritesFulfilled(state: FavoritesState, action: { payload: any }) {
    state.favorites = [...state.favorites, action.payload.cat];
}

export function fetchFavoritesFulfilled(state: FavoritesState, action: { payload: any }) {
    state.favorites = action.payload;
}

export function removeFromFavoritesPending(state: FavoritesState, action: { payload: any }) {

}

export function addToFavoritesPending(state: FavoritesState, action: { payload: any }) {

}

export function fetchFavoritesPending(state: FavoritesState, action: { payload: any }) {

}
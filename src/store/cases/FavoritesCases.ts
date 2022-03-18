import Favorite from "../../models/Favorite";
import {FavoritesState} from "../slices/FavoritesSlice";

export function removeFromFavoritesFulfilled(state: FavoritesState, action: { payload: any }) {}

export function addToFavoritesFulfilled(state: FavoritesState, action: { payload: any }) {}

export function fetchFavoritesFulfilled(state: FavoritesState, action: { payload: any }) {
    state.favorites = action.payload;
}

export function removeFromFavoritesPending(state: FavoritesState, action: { payload: any }) {

}

export function addToFavoritesPending(state: FavoritesState, action: { payload: any }) {

}

export function fetchFavoritesPending(state: FavoritesState, action: { payload: any }) {

}
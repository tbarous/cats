import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAPI} from "../../Api";
import Image from "../../models/Image";
import {setLoading, setNotification} from "../slices/AppSlice";
import Favorite from "../../models/Favorite";

export const fetchFavorites = createAsyncThunk(
    'app/fetchFavorites',
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));

        try {
            const response = await getAPI().getFavorites();

            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setNotification("There has been an error fetching your favorites."));
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
)

export const addToFavorites = createAsyncThunk(
    'app/addToFavorites',
    async (image: Image, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));

        try {
            const response = await getAPI().addToFavorites(image.id);

            thunkAPI.dispatch(setNotification("Image has been added to favorites!"));

            return {status: response.status, image};
        } catch (error) {
            thunkAPI.dispatch(setNotification("There has been an error adding the image to your favorites."));
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
)

export const removeFromFavorites = createAsyncThunk(
    'app/removeFromFavorites',
    async (favorite: Favorite, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));

        try {
            const response = await getAPI().removeFromFavorites(favorite.id);

            thunkAPI.dispatch(setNotification("Image has been removed from favorites!"));

            return favorite;
        } catch (error) {
            thunkAPI.dispatch(setNotification("There has been an error removing the image from your favorites"));
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
)
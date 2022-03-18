import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAPI} from "../../Api";
import {setLoading, setNotification} from "../slices/AppSlice";

export const fetchBreeds = createAsyncThunk(
    'app/fetchBreeds',
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));

        try {
            const response = await getAPI().getBreeds();

            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setNotification("There has been an error fetching breeds."));
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
)

export const searchByBreed = createAsyncThunk(
    'app/searchByBreed',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));

        try {
            const response = await getAPI().getByBreed(id);

            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setNotification("There has been an error fetching breed."));
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
)
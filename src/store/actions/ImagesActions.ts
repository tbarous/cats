import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAPI} from "../../Api";
import {setLoading, setNotification} from "../slices/AppSlice";
import {RootState} from "../store";

export const fetchImages = createAsyncThunk(
    'images/fetchImages',
    async (arg, thunkAPI) => {
        const {page} = (thunkAPI.getState() as RootState).images;

        thunkAPI.dispatch(setLoading(true));

        try {
            const response = await getAPI().getImages(page + 1);

            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setNotification("There has been an error fetching images."));
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
)

export const fetchImage = createAsyncThunk(
    'images/fetchImage',
    async (id: string, thunkAPI) => {
        try {
            const response = await getAPI().getImage(id);

            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setNotification("There has been an error fetching the image."));
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
)
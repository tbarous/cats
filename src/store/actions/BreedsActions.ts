import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAPI} from "../../Api";

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
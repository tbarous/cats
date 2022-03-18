import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAPI} from "../../Api";

export const fetchImages = createAsyncThunk(
    'app/fetchCats',
    async (arg, tools: any) => {
        const {page} = tools.getState();

        const response = await getAPI().getCats(page + 1);

        return response.data;
    }
)

export const fetchImage = createAsyncThunk(
    'app/fetchCat',
    async (id: string, thunkAPI) => {
        const response = await getAPI().getCat(id);

        return response.data;
    }
)
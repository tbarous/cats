import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from "../store";
import Image from "../../models/Image";
import {fetchImageFulfilled, fetchImagePending, fetchImagesFulfilled, fetchImagesPending} from "../cases/ImagesCases";
import {fetchImage, fetchImages} from "../actions/ImagesActions";

export interface ImagesState {
    images: Image[] | [],
    image: Image | null,
    page: number,
}

const initialState: ImagesState = {
    images: [],
    image: null,
    page: 0,
}

export const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        setImage: (state, action: PayloadAction<null | Image>) => {
            state.image = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchImages.fulfilled, fetchImagesFulfilled);
        builder.addCase(fetchImages.pending, fetchImagesPending);
        builder.addCase(fetchImage.fulfilled, fetchImageFulfilled);
        builder.addCase(fetchImage.pending, fetchImagePending);
    },
})

export const {setImage} = imagesSlice.actions;

export default imagesSlice.reducer;
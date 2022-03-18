import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Breed from "../../models/Breed";
import Image from "../../models/Image";
import {fetchBreeds, searchByBreed} from "../actions/BreedsActions";
import type {RootState} from "../store";
import {
    fetchBreedsFulfilled,
    fetchBreedsPending,
    searchByBreedFulfilled,
    searchByBreedPending
} from "../cases/BreedsCases";

export interface BreedsState {
    breeds: Breed[],
    breed: Breed | null,
    breedImages: Image[]
}

const initialState: BreedsState = {
    breeds: [],
    breed: null,
    breedImages: []
}

export const breedsSlice = createSlice({
    name: 'breeds',
    initialState,
    reducers: {
        setBreed: (state, action: PayloadAction<Breed | null>) => {
            state.breed = action.payload;
        },
        setBreedImages: (state, action: PayloadAction<Image[] | []>) => {
            state.breedImages = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBreeds.fulfilled, fetchBreedsFulfilled);
        builder.addCase(fetchBreeds.pending, fetchBreedsPending);
        builder.addCase(searchByBreed.fulfilled, searchByBreedFulfilled);
        builder.addCase(searchByBreed.pending, searchByBreedPending);
    },
})

export const {setBreed, setBreedImages} = breedsSlice.actions;

export default breedsSlice.reducer;
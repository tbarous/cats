import {BreedsState} from "../slices/BreedsSlice";

export function fetchBreedsFulfilled(state: BreedsState, action: { payload: any }) {
    state.breeds = action.payload;
}

export function fetchBreedsPending() {

}


export function searchByBreedFulfilled(state: BreedsState, action: { payload: any }) {
    state.breedImages = action.payload;
}

export function searchByBreedPending() {

}
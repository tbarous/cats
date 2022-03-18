import {ImagesState} from "../slices/ImagesSlice";

export function fetchImagesFulfilled(state: ImagesState, action: { payload: any }) {
    state.images = [...state.images, ...action.payload];

    state.page = state.page + 1;
}

export function fetchImagesPending() {

}


export function fetchImageFulfilled(state: ImagesState, action: { payload: any }) {
    state.image = action.payload;
}

export function fetchImagePending() {

}
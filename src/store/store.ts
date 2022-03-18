import {configureStore} from "@reduxjs/toolkit";
import AppReducer from "./slices/AppSlice";
import BreedsReducer from "./slices/BreedsSlice";
import FavoritesReducer from "./slices/FavoritesSlice";
import ImagesReducer from "./slices/ImagesSlice";

const store = configureStore({
    reducer: {
        app: AppReducer,
        breeds: BreedsReducer,
        favorites: FavoritesReducer,
        images: ImagesReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
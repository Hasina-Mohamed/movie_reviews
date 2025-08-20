import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlices } from "./slices/userSlices";
import { reviewSlices } from "./slices/reviewSlices";
import { favoriteApiSlice } from "./slices/favoriteApiSlice";
import { watchlistApiSlice } from "./slices/watchlistApiSlice";
import favoritesSlice from "./slices/bookmarkSlice";
import watchlistSlice from "./slices/watchlistSlice";

export const store = configureStore({
    reducer : {
        [userSlices.reducerPath]:userSlices.reducer,
        [reviewSlices.reducerPath]:reviewSlices.reducer,
        [favoriteApiSlice.reducerPath]:favoriteApiSlice.reducer,
        [watchlistApiSlice.reducerPath]:watchlistApiSlice.reducer,
        favorites : favoritesSlice,
        watchlist: watchlistSlice
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(userSlices.middleware)
    .concat(reviewSlices.middleware)
    .concat(favoriteApiSlice.middleware)
    .concat(watchlistApiSlice.middleware)
})
setupListeners(store.dispatch)

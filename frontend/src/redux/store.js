import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlices } from "./slices/userSlices";
import { reviewSlices } from "./slices/reviewSlices";
import bookmarkSlice from "./slices/bookmarkSlice";

export const store = configureStore({
    reducer : {
        [userSlices.reducerPath]:userSlices.reducer,
        [reviewSlices.reducerPath]:reviewSlices.reducer,
        bookmark : bookmarkSlice
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(userSlices.middleware)
    .concat(reviewSlices.middleware)
})
setupListeners(store.dispatch)
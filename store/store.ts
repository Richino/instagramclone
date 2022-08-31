import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice";
import dataSlice from "./dataSlice";
import storiesSlice from "./storiesSlice";

export const store = configureStore({
    reducer: { redux: slice},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

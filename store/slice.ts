import users from "../user.json";
import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface State {
    users: any;
    postIndex: number;
    openPost: boolean;
    comments: boolean;
    id: string | string[] | undefined;
    profileId: string;
    storyCount: number;
    openImage: boolean;
    unmountPost: boolean;
    storiesTotal: number;
}

const initialState: State = {
    users: users,
    postIndex: 0,
    openPost: false,
    comments: false,
    id: "e48f0c66-4348-48a2-80a1-800da26732fd",
    profileId: "e48f0c66-4348-48a2-80a1-800da26732fd",
    storyCount: 5,
    openImage: false,
    unmountPost: false,
    storiesTotal: 5,
};

export const slice = createSlice({
    name: "slice",
    initialState,
    reducers: {
        openPost: (state, action: PayloadAction<number>) => {
            state.postIndex = action.payload;
        },
        restore: (state) => {
            state.postIndex = 0;
        },
        post: (state) => {
            if (state.openPost === false) {
                state.openPost = true;
            } else {
                state.openPost = false;
            }
        },
        closePost: (state) => {
            state.openPost = false;
        },
        openComments: (state) => {
            state.comments = true;
        },
        closeComments: (state) => {
            state.comments = false;
        },
        getId: (state, action: PayloadAction<string | string[] | undefined>) => {
            state.id = action.payload;
        },
        story: (state, action: PayloadAction<number>) => {
            state.storyCount += action.payload;
        },

        image: (state, action: PayloadAction<boolean>) => {
            state.openImage = action.payload;
        },
        unmount: (state) => {
            if (state.unmountPost === false) {
                state.unmountPost = true;
            } else {
                state.unmountPost = false;
            }
        },
        storiesCount: (state, action: PayloadAction<number>) => {
            state.storiesTotal += action.payload;
        },
        imageLocation: (state, action: PayloadAction<number>) => {
            state.postIndex = action.payload;
        },
    },
});

export const { openPost, restore, getId, story, post, image, openComments, closeComments, unmount, storiesCount, imageLocation, closePost } =
    slice.actions;

export default slice.reducer;

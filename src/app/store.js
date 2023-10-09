import { configureStore } from "@reduxjs/toolkit";
import subredditReducer from "../app/subredditSlice";
import redditReducer from "../app/redditSlice";

export const store = configureStore({
  reducer: {
    subreddits: subredditReducer,
    reddit: redditReducer,
  },
});

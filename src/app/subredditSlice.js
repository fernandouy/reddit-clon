import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  subreddits: [],
  error: false,
  isLoading: false,
};

const baseUrl = `https://www.reddit.com`;

export const fetchSubreddits = createAsyncThunk(
  "subreddits/fetchSubreddits",
  async () => {
    const response = await fetch(`${baseUrl}/subreddits.json`);
    const jsonResponse = await response.json();
    return jsonResponse.data.children.map((subreddit) => subreddit.data);
  }
);

const subredditSlice = createSlice({
  name: "subreddits",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subreddits = action.payload;
      })
      .addCase(fetchSubreddits.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default subredditSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  error: false,
  isLoading: false,
  searchTerm: "",
  selectedSubreddit: "/r/Home/",
};

const baseUrl = `https://www.reddit.com`;

export const getSubredditPosts = createAsyncThunk(
  "reddit/getSubredditPosts",
  async (subreddit) => {
    const response = await fetch(`${baseUrl}${subreddit}.json`);
    const jsonResponse = await response.json();
    return jsonResponse.data.children.map((post) => post.data);
  }
);

export const getPostComments = createAsyncThunk(
  "reddit/getPostComments",
  async (permalink) => {
    const response = await fetch(`${baseUrl}${permalink}.json`);
    const jsonResponse = await response.json();
    return jsonResponse[1].data.children.map((subreddit) => subreddit.data);
  }
);

const redditSlice = createSlice({
  name: "redditPosts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
      state.searchTerm = "";
    },
    toggleShowingComments(state, action) {
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubredditPosts.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getSubredditPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getSubredditPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(getPostComments.pending, (state, action) => {
        state.posts[action.payload].showingComments =
          !state.posts[action.payload].showingComments;
        if (!state.posts[action.payload].showingComments) {
          return;
        }
        state.posts[action.payload].loadingComments = true;
        state.posts[action.payload].error = false;
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.posts[action.payload.index].loadingComments = false;
        state.posts[action.payload.index].comments = action.payload.comments;
      })
      .addCase(getPostComments.rejected, (state, action) => {
        state.posts[action.payload].loadingComments = false;
        state.posts[action.payload].error = true;
      });
  },
});

export const {
  setPosts,
  setSearchTerm,
  setSelectedSubreddit,
  toggleShowingComments,
} = redditSlice.actions;

export default redditSlice.reducer;

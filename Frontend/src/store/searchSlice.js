import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",  // Store the search query
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;  // Update search query
    },
    clearSearchQuery: (state) => {
      state.query = "";  // Clear search query
    },
  },
});

export const { setSearchQuery, clearSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;

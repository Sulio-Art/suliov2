import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFilterModalOpen: false,
};

const artworkSlice = createSlice({
  name: "artwork",
  initialState,
  reducers: {
    toggleFilterModal: (state) => {
      state.isFilterModalOpen = !state.isFilterModalOpen;
    },
  },
});

export const { toggleFilterModal } = artworkSlice.actions;
export default artworkSlice.reducer;

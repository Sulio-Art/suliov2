import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFormDirty: false,
  isUnsavedChangesDialogOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFormDirty: (state, action) => {
      state.isFormDirty = action.payload;
    },
    openUnsavedChangesDialog: (state) => {
      state.isUnsavedChangesDialogOpen = true;
    },
    closeUnsavedChangesDialog: (state) => {
      state.isUnsavedChangesDialogOpen = false;
    },
  },
});

export const {
  setFormDirty,
  openUnsavedChangesDialog,
  closeUnsavedChangesDialog,
} = uiSlice.actions;

export default uiSlice.reducer;

export const selectIsFormDirty = (state) => state.ui.isFormDirty;
export const selectIsUnsavedChangesDialogOpen = (state) => state.ui.isUnsavedChangesDialogOpen;
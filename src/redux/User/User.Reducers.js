// import { createSlice } from '@reduxjs/toolkit';
// import { fetchUserProfile } from './User.Action';

// const initialState = {
//   profile: null,
//   loading: 'idle', 
//   error: null,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
   
//     clearUserProfile: (state) => {
//       state.profile = null;
//       state.error = null;
//     }
//   },
 
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.loading = 'pending';
//         state.error = null;
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.loading = 'succeeded';
//         state.profile = action.payload;
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.loading = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearUserProfile } = userSlice.actions;
// export default userSlice.reducer;
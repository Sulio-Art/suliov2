// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios"; // Example using axios

// // createAsyncThunk generates pending, fulfilled, and rejected action types
// export const fetchUserProfile = createAsyncThunk(
//   "user/fetchProfile", // This becomes the action type prefix
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `https://q2l5kktv-5000.inc1.devtunnels.ms/api/users/${userId}`
//       );
//       return response.data; // This becomes the action.payload on success
//     } catch (error) {
//       // Use rejectWithValue to return a specific error payload
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

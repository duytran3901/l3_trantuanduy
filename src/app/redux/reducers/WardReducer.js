import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wards: [],
  reload: false
};

const WardSlice = createSlice({
  name: "ward",
  initialState,
  reducers: {
    getWards: (state, action) => {
      state.wards = action.payload;
    },
    createWard: (state, action) => {
      state.wards.push(action.payload);
    },
    editWard: (state, action) => {
      const index = state.wards.findIndex(Ward => Ward.id === action.payload.id);
      state.wards.splice(index, 1, action.payload);
    },
    searchWard: (state, action) => {
      state.wards = action.payload;
    },
    deleteWard: (state, action) => {
      state.wards = state.wards.filter(ward => ward.id !== action.payload);
      state.reload = !state.reload;
    }
  },
});

export const { 
  getWards, 
  createWard,
  editWard,
  searchWard,
  deleteWard
} = WardSlice.actions;

export default WardSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  districts: [],
  wards: [],
  reload: false
};

const DistrictSlice = createSlice({
  name: "district",
  initialState,
  reducers: {
    getDistricts: (state, action) => {
      state.districts = action.payload;
    },
    createDistrict: (state, action) => {
      state.districts.push(action.payload);
    },
    editDistrict: (state, action) => {
      const index = state.districts.findIndex(district => district.id === action.payload.id);
      state.districts.splice(index, 1, action.payload);
    },
    searchDistrict: (state, action) => {
      state.districts = action.payload;
    },
    deleteDistrict: (state, action) => {
      state.districts = state.districts.filter(district => district.id !== action.payload);
      state.reload = !state.reload;
    },
    getWardsByDistrictId: (state, action) => {
      state.wards = action.payload;
    }
  },
});

export const { 
  getDistricts, 
  createDistrict,
  editDistrict,
  searchDistrict,
  deleteDistrict,
  getWardsByDistrictId
} = DistrictSlice.actions;

export default DistrictSlice.reducer;

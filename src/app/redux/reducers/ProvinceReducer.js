import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  provinces: [],
  districts: [],
  reload: false
};

const ProvinceSlice = createSlice({
  name: "province",
  initialState,
  reducers: {
    getProvinces: (state, action) => {
      state.provinces = action.payload;
    },
    createProvince: (state, action) => {
      state.provinces.push(action.payload);
    },
    editProvince: (state, action) => {
      const index = state.provinces.findIndex(province => province.id === action.payload.id);
      state.provinces.splice(index, 1, action.payload);
    },
    searchProvince: (state, action) => {
      state.provinces = action.payload;
    },
    deleteProvince: (state, action) => {
      state.provinces = state.provinces.filter(province => province.id !== action.payload);
      state.reload = !state.reload;
    },
    getDistrictsByProvinceId: (state, action) => {
      state.districts = action.payload;
    }
  },
});

export const { 
  getProvinces, 
  createProvince,
  editProvince,
  searchProvince,
  deleteProvince,
  getDistrictsByProvinceId
} = ProvinceSlice.actions;

export default ProvinceSlice.reducer;


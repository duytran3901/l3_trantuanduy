import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  employee: {},
  totalElements: 0,
  reload: false
};

const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    searchEmployee: (state, action) => {
      state.employees = action.payload.data;
      state.totalElements = action.payload.totalElements;
    },
    getEmployeeById: (state, action) => {
      state.employee = action.payload.data;
    },
    createEmployee: (state, action) => {
      state.employees.push(action.payload.data);
    },
    editEmployee: (state, action) => {
      const index = state.employees.findIndex(employee => employee.id === action.payload.id);
      state.employees.splice(index, 1, action.payload);
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(employee => employee.id !== action.payload);
      state.reload = !state.reload;
    }
  },
});

export const {
  getEmployeeById,
  createEmployee,
  editEmployee,
  searchEmployee,
  deleteEmployee
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  employee: null,
  reload: false
};

const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    getEmployees: (state, action) => {
      state.employees = action.payload;
    },
    getEmployeeById: (state, action) => {
      state.employee = action.payload;
    },
    createEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    editEmployee: (state, action) => {
      const index = state.employees.findIndex(employee => employee.id === action.payload.id);
      state.employees.splice(index, 1, action.payload);
    },
    searchEmployee: (state, action) => {
      state.employees = action.payload;
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(employee => employee.id !== action.payload);
      state.reload = !state.reload;
    }
  },
});

export const { 
  getEmployees, 
  getEmployeeById,
  createEmployee,
  editEmployee,
  searchEmployee,
  deleteEmployee
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;


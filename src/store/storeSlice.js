import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
  name: "storeData",
  initialState: {
    incomes: [],
    expenses: [],
    selectedMonth: "",
    showFilterOption: "close",
    filteredIncome_Expenses: [],
  },
  reducers: {
    addIncome: (state, action) => {},
    addExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    handleSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    handleShowFilterOption: (state, action) => {
      state.showFilterOption = action.payload;
    },
    handleFilteredIncome_Expenses: (state, action) => {
      console.log(action.payload)
      state.filteredIncome_Expenses = action.payload;
    },
  },
});
export const {
  addExpenses,
  addIncome,
  handleSelectedMonth,
  handleShowFilterOption,
  handleFilteredIncome_Expenses,
} = storeSlice.actions;
export default storeSlice.reducer;

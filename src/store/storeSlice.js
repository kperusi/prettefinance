import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
  name: "storeData",
  initialState: {
    incomes: [],
    expenses: [],
    selectedMonth: "",
    showFilterOption: "close",
    filteredIncome_Expenses: [],
    selectedMonthAndSource:[],
    account_type:''
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
   
      state.filteredIncome_Expenses = action.payload;
    },
    handleSelectedMonthAndSource:(state,action)=>{
      state.selectedMonthAndSource.push(action.payload)

    },
    handleSelectAccount:(state,action)=>{
      state.account_type=action.payload
    }
  },
});
export const {
  addExpenses,
  addIncome,
  handleSelectedMonth,
  handleShowFilterOption,
  handleFilteredIncome_Expenses,
  handleSelectedMonthAndSource,
  handleSelectAccount,
} = storeSlice.actions;
export default storeSlice.reducer;

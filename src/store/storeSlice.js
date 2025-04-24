import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
  name: "storeData",
  initialState: {
    incomes: [],
    expenses: [],
    selectedMonth:''
  },
  reducers: {
    addIncome: (state, action) => {},
    addExpenses: (state, action) => {},
    handleSelectedMonth:(state,action)=>{
        state.selectedMonth=action.payload
    }
  },
});
export const { addExpenses, addIncome,handleSelectedMonth } = storeSlice.actions;
export default storeSlice.reducer;

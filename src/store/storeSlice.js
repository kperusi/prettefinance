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
    account_type:'',
    show_dialog:false
    
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
         console.log('showdialog')
    },
    handleShowDialog:(state,action)=>{
  
      if(state.show_dialog===true){
       state.show_dialog=false
      }
      else state.show_dialog=true
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
  handleShowDialog,
} = storeSlice.actions;
export default storeSlice.reducer;

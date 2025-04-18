import React,{useEffect,useState} from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./homepage/Home";
import Login from "./login/Login";
import Register from "./register/Register";
import Content from "./dashboard/Dashboard";
import "../src/Styles/main.css";
import Page from "./pages/Page";
import Dashboard from "./dashboard/Dashboard";
import Income from "./income/Income";
import Expenses from "./expenses/Expenses";
import TransactionLayout from "./transaction/TransactionLayout";
import AddIncome from "./transaction/AddIncome";
import AddExpenses from "./transaction/AddExpenses";
import SingleIncome from "./singleincome/SingleIncome";
import Report from "./report/Report";
export default function MyRouter() {

 const [select, setSelect] = useState({
    dashboard: "",
    income: "",
    expenses: "",
    report: "",
  });

  const handleSelected = (name) => {
    if (name === "dashboard") {
      setSelect({ dashboard: "select", income: "", expenses: "", report: "" });
    }

    if (name === "income") {
      setSelect({ dashboard: "", income: "select", expenses: "", report: "" });
    }

    if (name === "expenses") {
      setSelect({ dashboard: "", income: "", expenses: "select", report: "" });
    }

    if (name === "report") {
      setSelect({ dashboard: "", income: "", expenses: "", report: "select" });
    }
  };


  useEffect(()=>{
    setSelect({ dashboard: "select", income: "", expenses: "", report: "" });
 if(window.location.pathname.includes('income')){
  setSelect({ dashboard: "", income: "select", expenses: "", report: "" });

 }
 if(window.location.pathname.includes('expenses')){
  setSelect({ dashboard: "", income: "", expenses: "select", report: "" });

 }
  },[])

console.log(select)
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ebcfinance-register" element={<Register />} />
        <Route path="/ebcfinance-login" element={<Login />} />
        <Route path="/ebcfinance/views" element={<Page handleSelected={handleSelected} setSelect={setSelect} select={select} />}>
          <Route index element={<Dashboard handleSelected={handleSelected} select={select} setSelect={setSelect} />} />
          <Route path="income" element={<Income />} />
          <Route path="expenses" element={<Expenses />} />
        </Route>
        <Route
          path="/ebcfinance/addtransactions"
          element={<TransactionLayout />}
        >
          <Route index element={<AddIncome />} />
          <Route path="addincome" element={<AddIncome />} />
          <Route path="addexpenses" element={<AddExpenses />} />
        </Route>
        <Route path='/ebcfinance/income/:id' element={<SingleIncome/>}/>
        <Route path='/ebcfinance/editingincome/:id' element={<AddIncome/>}/>
        <Route path='/ebcfinance/expense/:id' element={<SingleIncome/>}/>
        <Route path='/ebcfinance/editingexpense/:id' element={<AddExpenses/>}/>
        <Route path='/ebcfinance/generatereport' element={<Report/>}/>
      </Routes>
    </div>
  );
}

import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { handleSelectAccount } from '../store/storeSlice';
import { db, auth } from "../firebase/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";


export default function WelcomePage() {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const account_type = useSelector((state)=>state.sliceData.account_type)
const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
console.log(account_type)
const handleMainBottonClick=()=>{
navigate('/prettifinance/account/main')
localStorage.setItem('account_type',JSON.stringify('Main account'))
dispatch(handleSelectAccount('Main account'))
 try {
      const incomeRef = collection(db, "Income");
      const q = query(
        incomeRef,
        // where("account_type", "==", "Main account"),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q, (snapshot) => {
        const incomes = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(item=>item.account_type==='Main account');
        setLoading(false);
        console.log(incomes);
        // localStorage.setItem("incomes", JSON.stringify(incomes));
        if (incomes.length > 0) {
          localStorage.setItem("incomes", JSON.stringify(incomes));
        }
      });
    } catch (error) {
      setError(error);
    }

 try {
      const expensesRef = collection(db, "Expenses");
      const q = query(
        expensesRef,
        orderBy("date", "desc")
        // where("status", "==", "published")/
      );
      onSnapshot(q, (snapshot) => {
        const expenses = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
         .filter(item=>item.account_type==='Main account');;
        setLoading(false);
        // setExpense(expenses);
        if (expenses.length > 0) {
          localStorage.setItem("expenses", JSON.stringify(expenses));
        }
      });
    } catch (error) {
      setError(error);
    }


}
const handleProjectBottonClick=()=>{
navigate('/prettifinance/account/main')
localStorage.setItem('account_type',JSON.stringify('Project account'))
dispatch(handleSelectAccount('Project account'))
try {
      const incomeRef = collection(db, "Income");
      const q = query(
        incomeRef,
        // where("account_type", "==", "Main account"),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q, (snapshot) => {
        const incomes = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(item=>item.account_type==='Project account');
        setLoading(false);
        console.log(incomes);
        // localStorage.setItem("incomes", JSON.stringify(incomes));
        if (incomes.length > 0) {
          localStorage.setItem("incomes", JSON.stringify(incomes));
        }
      });
    } catch (error) {
      setError(error);
    }
 try {
      const expensesRef = collection(db, "Expenses");
      const q = query(
        expensesRef,
        orderBy("date", "desc")
        // where("status", "==", "published")/
      );
      onSnapshot(q, (snapshot) => {
        const expenses = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
         .filter(item=>item.account_type==='Project account');;
        setLoading(false);
        // setExpense(expenses);
        if (expenses.length > 0) {
          localStorage.setItem("expenses", JSON.stringify(expenses));
        }
      });
    } catch (error) {
      setError(error);
    }
}
  return (
    <main>
      <h1>Select Account</h1>
      <section className="home-btn-cx">
        <button className="project-acct-btn"onClick={handleProjectBottonClick} type="button">
          Project Account
        </button>
         <button className="main-acct-btn" onClick={handleMainBottonClick} type="button">
          Main Account
        </button>
      </section>

    </main>
  )
}

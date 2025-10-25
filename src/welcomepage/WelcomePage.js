import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleSelectAccount } from "../store/storeSlice";
import { db, auth } from "../firebase/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import "./welcomepagestyles/welcomepage.css";
export default function WelcomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account_type = useSelector((state) => state.sliceData.account_type);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(account_type);
  const handleMainBottonClick = () => {
    navigate("/prettifinance/account/main");
    localStorage.setItem("account_type", JSON.stringify("Main account"));
    dispatch(handleSelectAccount("Main account"));
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
          .filter((item) => item.account_type === "Main account");
        setLoading(false);
        console.log(incomes);
        // localStorage.setItem("incomes", JSON.stringify(incomes));
        if (incomes.length > 0) {
          localStorage.setItem("incomes", JSON.stringify(incomes));
          localStorage.setItem("Main account incomes", JSON.stringify(incomes));
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
          .filter((item) => item.account_type === "Main account");
        setLoading(false);
        // setExpense(expenses);
        if (expenses.length > 0) {
          localStorage.setItem("expenses", JSON.stringify(expenses));
          localStorage.setItem("Main account expenses", JSON.stringify(expenses));
        }
      });
    } catch (error) {
      setError(error);
    }
  };
  const handleProjectBottonClick = () => {
    navigate("/prettifinance/account/main");
    localStorage.setItem("account_type", JSON.stringify("Project account"));
    dispatch(handleSelectAccount("Project account"));
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
          .filter((item) => item.account_type === "Project account");
        setLoading(false);
        console.log(incomes);
        // localStorage.setItem("incomes", JSON.stringify(incomes));
        if (incomes.length > 0) {
          localStorage.setItem("incomes", JSON.stringify(incomes));
          localStorage.setItem("Project account incomes", JSON.stringify(incomes));
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
          .filter((item) => item.account_type === "Project account");
        setLoading(false);
        // setExpense(expenses);
        if (expenses.length > 0) {
          localStorage.setItem("expenses", JSON.stringify(expenses));
          localStorage.setItem("Project account expenses", JSON.stringify(expenses));

        }
      });
    } catch (error) {
      setError(error);
    }
  };
  return (
    <main className="welcome_main">
      <h1>Select Account</h1>
      <div>
        <p>
          <span style={{ fontSize: "1.4em",fontStyle:'oblique'}}>Welcome to  <span style={{ fontSize: "1.2em", color: "darkblue" }}>
            <b>Prettifinance</b>
          </span></span>
         
          select your account to continue
        </p>
      </div>
      <section className="home_btn_cx">
        <button
          className="main_acct_btn"
          onClick={handleMainBottonClick}
          type="button"
        >
          Main Account
        </button>
        <button
          className="project_acct_btn"
          onClick={handleProjectBottonClick}
          type="button"
        >
          Project Account
        </button>
      </section>
    </main>
  );
}

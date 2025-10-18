import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleSelectAccount } from "../store/storeSlice";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export default function LogoutDialog() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("ebcfinance-user");
    localStorage.removeItem("loginUserDetails");
    signOut(auth);

    // navigate("/");
    window.location.href = "/ebcfinance-login";
  };

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
        }
      });
    } catch (error) {
      setError(error);
    }
  };
  return (
    <main className="setting_main">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "10px",
          justifyContent: "space-between",
          backgroundColor: "lightblue",
          marginBottom: "20px",
        }}
      >
        <span
          className="setting_back_icon_cx"
          onClick={() => {
            navigate(-1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="29px"
            viewBox="0 -960 960 960"
            width="29px"
            fill="#white"
          >
            <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" />
          </svg>
          Back
        </span>
        <h3>Settings</h3>
      </div>
      <section className="setting_section_two">
        <div>
          <h3>Profile</h3>
          <ul>
            <li>Change image</li>
            <li>Change password</li>
          </ul>
        </div>
        <hr />
        <div className="setting_sw_acct">
          <h3>Switch Accounts</h3>
          <ul>
            <li onClick={handleMainBottonClick}>
              <span>Main Account</span>
            </li>
            <li onClick={handleProjectBottonClick}>
              <span>Project Account</span>
            </li>
          </ul>
        </div>
        <hr />
        <span onClick={handleLogout}>Log Out</span>
      </section>
    </main>
  );
}

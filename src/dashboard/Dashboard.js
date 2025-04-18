import React, { useEffect, useState } from "react";

import "./dashboardstyles/dashboardstyles.css";
import { db, auth } from "../firebase/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
export default function Dashboard({ handleSelected, select, setSelect }) {
  const [user, setUser] = useState();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState();
  const [totalExpenses, setTotalExpenses] = useState();
  const [totalBalance, setTotalBalance] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [id, setId] = useState();
  const [userRole, setUserRole] = useState();
  const [loginUserDetail, setLoginUserDetail] = useState({});
  const [mouseEnter, setMouseEnter] = useState("");
  const balancebf= 1219033.01

  console.log(select);

  useEffect(() => {
    // try {
    //   const loginUserDetailsRef = collection(db, "users");
    //   const q = query(loginUserDetailsRef);
    //   onSnapshot(q, (snapshot) => {
    //     const loginUsersDetails = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     setLoading(false);

    //     const fetchLoginUser = loginUsersDetails.find(
    //       (_user) => _user?.id === user?.uid
    //     );

    //     if (fetchLoginUser) {
    //       localStorage.setItem(
    //         "loginUserDetails",
    //         JSON.stringify(fetchLoginUser)
    //       );
    //     }

    //     // setLoginUserDetail(fetchLoginUser);
    //   });
    // } catch (error) {
    //   setError(error);
    // }

    try {
      const expensesRef = collection(db, "Expenses");
      const q = query(
        expensesRef,
        orderBy("date", "desc")
        // where("status", "==", "published")
      );
      onSnapshot(q, (snapshot) => {
        const expenses = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        // setExpense(expenses);
        if (expenses.length > 0) {
          localStorage.setItem("expenses", JSON.stringify(expenses));
        }
      });
    } catch (error) {
      setError(error);
    }

    try {
      const incomeRef = collection(db, "Income");
      const q = query(
        incomeRef,
        orderBy("date", "desc")
        // where("status", "==", "published")
      );
      onSnapshot(q, (snapshot) => {
        const incomes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);

        if (incomes.length > 0) {
          localStorage.setItem("incomes", JSON.stringify(incomes));
        }
      });
    } catch (error) {
      setError(error);
    }
  }, [id]);

  useEffect(() => {
    const storedIncome = JSON.parse(localStorage.getItem("incomes")) || [];
    const storedExpense = JSON.parse(localStorage.getItem("expenses")) || [];
    const storedUser =
      JSON.parse(localStorage.getItem("ebcfinance-user")) || null;
    const storedUserDetails =
      JSON.parse(localStorage.getItem("loginUserDetails")) || null;
    // Update state with retrieved values
    console.log(storedUserDetails);
    setIncomes(storedIncome);
    setExpenses(storedExpense);
    setLoginUserDetail(storedUserDetails);
    setId(storedUser.uid);
    setUser(storedUser);
    const totalExpenses = storedExpense.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );
    const totalIncomes = storedIncome.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );
    setTotalIncome(totalIncomes);
    setTotalExpenses(totalExpenses);
    setTotalBalance(totalIncomes-totalExpenses);
  }, []);

  console.log(totalBalance);

  const handleLogout = () => {
    localStorage.removeItem("ebcfinance-user");
    localStorage.removeItem("loginUserDetails");
    signOut(auth);

    // navigate("/");
    window.location.href = "/ebcfinance-login";
  };

  const handleMouseEnter = () => {
    if (mouseEnter === "") {
      setMouseEnter("mouseEnter");
    } else {
      setMouseEnter("");
    }
  };

  return (
    <main className="content-main">
      <section className="dashboard-logo">
        <div>
          <h1>AuditoR</h1>
          <h4>Easy Control and See Your Finance</h4>
        </div>
      </section>

      <section className="dashboard-title">
        <h3>{user?.displayName}</h3>
        <button onClick={handleLogout} className="logout">
          Logout
        </button>
      </section>
      {loginUserDetail?.role === "admin" && (
        <section
          className={`dashboard-add-transaction-cx ${mouseEnter}`}
          onMouseEnter={handleMouseEnter}
        >
          {/* <div className="navbar-item-cx"> */}
          <NavLink to="/ebcfinance/addtransactions" className="navlink">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="white"
              style={{ fill: "white" }}
            >
              <path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z" />
            </svg>
            {/* <h5>Transaction</h5> */}
          </NavLink>
          {/* </div> */}
        </section>
      )}

      <section className="dashboard-section-one">
        <div>
          <h3>Balance b/f</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <svg
              fill="#ffffff"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 496.262 496.262"
            >
              <path d="M477.832,274.28h-67.743v-65.106h67.743c10.179,0,18.43-8.243,18.43-18.424c0-10.182-8.251-18.43-18.43-18.43h-67.743 V81.982c0-13.187-2.606-22.866-7.743-28.762c-4.882-5.609-11.301-8.219-20.19-8.219c-8.482,0-14.659,2.592-19.447,8.166 c-5.077,5.902-7.654,15.599-7.654,28.821v90.343H227.627l-54.181-81.988c-4.637-7.317-8.997-14.171-13.231-20.75 c-3.812-5.925-7.53-10.749-11.042-14.351c-3.109-3.189-6.652-5.657-10.796-7.554c-3.91-1.785-8.881-2.681-14.762-2.681 c-7.501,0-14.31,2.055-20.83,6.277c-6.452,4.176-10.912,9.339-13.636,15.785c-2.391,6.126-3.656,15.513-3.656,27.63v77.626h-67.07 C8.246,172.326,0,180.574,0,190.755c0,10.181,8.246,18.424,18.424,18.424h67.07v65.113h-67.07C8.246,274.292,0,282.538,0,292.722 C0,302.9,8.246,311.14,18.424,311.14h67.07v103.143c0,12.797,2.689,22.378,8.015,28.466c5.065,5.805,11.487,8.5,20.208,8.5 c8.414,0,14.786-2.707,20.07-8.523c5.411-5.958,8.148-15.533,8.148-28.442V311.14h115.308l62.399,95.683 c4.339,6.325,8.819,12.709,13.287,18.969c4.031,5.621,8.429,10.574,13.069,14.711c4.179,3.742,8.659,6.484,13.316,8.157 c4.794,1.726,10.397,2.601,16.615,2.601c16.875,0,34.158-5.166,34.158-43.479V311.14h67.743c10.179,0,18.43-8.252,18.43-18.43 C496.262,282.532,488.011,274.28,477.832,274.28z M355.054,209.173v65.106h-60.041l-43.021-65.106H355.054z M141.936,134.364 l24.76,37.956h-24.76V134.364z M141.936,274.28v-65.106h48.802l42.466,65.106H141.936z M355.054,365.153l-35.683-54.013h35.683 V365.153z" />{" "}
            </svg>
            <h2 style={{ color: "white" }}>{balancebf}</h2>
          </div>
        </div>
        <div className="balance-cx">
          <h3>Balance</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <svg
              fill="#ffffff"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="50px"
              viewBox="0 0 496.262 496.262"
            >
              <path d="M477.832,274.28h-67.743v-65.106h67.743c10.179,0,18.43-8.243,18.43-18.424c0-10.182-8.251-18.43-18.43-18.43h-67.743 V81.982c0-13.187-2.606-22.866-7.743-28.762c-4.882-5.609-11.301-8.219-20.19-8.219c-8.482,0-14.659,2.592-19.447,8.166 c-5.077,5.902-7.654,15.599-7.654,28.821v90.343H227.627l-54.181-81.988c-4.637-7.317-8.997-14.171-13.231-20.75 c-3.812-5.925-7.53-10.749-11.042-14.351c-3.109-3.189-6.652-5.657-10.796-7.554c-3.91-1.785-8.881-2.681-14.762-2.681 c-7.501,0-14.31,2.055-20.83,6.277c-6.452,4.176-10.912,9.339-13.636,15.785c-2.391,6.126-3.656,15.513-3.656,27.63v77.626h-67.07 C8.246,172.326,0,180.574,0,190.755c0,10.181,8.246,18.424,18.424,18.424h67.07v65.113h-67.07C8.246,274.292,0,282.538,0,292.722 C0,302.9,8.246,311.14,18.424,311.14h67.07v103.143c0,12.797,2.689,22.378,8.015,28.466c5.065,5.805,11.487,8.5,20.208,8.5 c8.414,0,14.786-2.707,20.07-8.523c5.411-5.958,8.148-15.533,8.148-28.442V311.14h115.308l62.399,95.683 c4.339,6.325,8.819,12.709,13.287,18.969c4.031,5.621,8.429,10.574,13.069,14.711c4.179,3.742,8.659,6.484,13.316,8.157 c4.794,1.726,10.397,2.601,16.615,2.601c16.875,0,34.158-5.166,34.158-43.479V311.14h67.743c10.179,0,18.43-8.252,18.43-18.43 C496.262,282.532,488.011,274.28,477.832,274.28z M355.054,209.173v65.106h-60.041l-43.021-65.106H355.054z M141.936,134.364 l24.76,37.956h-24.76V134.364z M141.936,274.28v-65.106h48.802l42.466,65.106H141.936z M355.054,365.153l-35.683-54.013h35.683 V365.153z" />{" "}
            </svg>
            <h1 style={{color:'white',fontSize:'2.3em'}}>{(totalBalance)}</h1>
          </div>
        </div>
        <hr />
        <div className="dashboard-section-income-expenses-cx">
          <div className="dashboard-section-one-income">
            <h5 style={{ color: "#e7e5e5" }}>Income</h5>
            <h3 style={{ display: "flex", alignItems: "center" ,fontSize:'1.4em',color:'white'}}>
              <svg
                fill="#ffffff"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink"
                width="30px"
                height="30px"
                viewBox="0 0 496.260 496.262"
                // xml:space="preserve"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path d="M477.832,274.28h-67.743v-65.106h67.743c10.179,0,18.43-8.243,18.43-18.424c0-10.182-8.251-18.43-18.43-18.43h-67.743 V81.982c0-13.187-2.606-22.866-7.743-28.762c-4.882-5.609-11.301-8.219-20.19-8.219c-8.482,0-14.659,2.592-19.447,8.166 c-5.077,5.902-7.654,15.599-7.654,28.821v90.343H227.627l-54.181-81.988c-4.637-7.317-8.997-14.171-13.231-20.75 c-3.812-5.925-7.53-10.749-11.042-14.351c-3.109-3.189-6.652-5.657-10.796-7.554c-3.91-1.785-8.881-2.681-14.762-2.681 c-7.501,0-14.31,2.055-20.83,6.277c-6.452,4.176-10.912,9.339-13.636,15.785c-2.391,6.126-3.656,15.513-3.656,27.63v77.626h-67.07 C8.246,172.326,0,180.574,0,190.755c0,10.181,8.246,18.424,18.424,18.424h67.07v65.113h-67.07C8.246,274.292,0,282.538,0,292.722 C0,302.9,8.246,311.14,18.424,311.14h67.07v103.143c0,12.797,2.689,22.378,8.015,28.466c5.065,5.805,11.487,8.5,20.208,8.5 c8.414,0,14.786-2.707,20.07-8.523c5.411-5.958,8.148-15.533,8.148-28.442V311.14h115.308l62.399,95.683 c4.339,6.325,8.819,12.709,13.287,18.969c4.031,5.621,8.429,10.574,13.069,14.711c4.179,3.742,8.659,6.484,13.316,8.157 c4.794,1.726,10.397,2.601,16.615,2.601c16.875,0,34.158-5.166,34.158-43.479V311.14h67.743c10.179,0,18.43-8.252,18.43-18.43 C496.262,282.532,488.011,274.28,477.832,274.28z M355.054,209.173v65.106h-60.041l-43.021-65.106H355.054z M141.936,134.364 l24.76,37.956h-24.76V134.364z M141.936,274.28v-65.106h48.802l42.466,65.106H141.936z M355.054,365.153l-35.683-54.013h35.683 V365.153z" />{" "}
                  </g>{" "}
                </g>
              </svg>
              {totalIncome}
            </h3>
          </div>
          <hr />
          <div className="dashboard-section-one-income">
            <h5 style={{ color: "#e7e5e5" }}>Expenses</h5>
            <h3 style={{ display: "flex", alignItems: "center",fontSize:'1.4em', }}>
              <svg
                fill="#ffffff"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
                viewBox="0 0 496.262 496.262"
              >
                <path d="M477.832,274.28h-67.743v-65.106h67.743c10.179,0,18.43-8.243,18.43-18.424c0-10.182-8.251-18.43-18.43-18.43h-67.743 V81.982c0-13.187-2.606-22.866-7.743-28.762c-4.882-5.609-11.301-8.219-20.19-8.219c-8.482,0-14.659,2.592-19.447,8.166 c-5.077,5.902-7.654,15.599-7.654,28.821v90.343H227.627l-54.181-81.988c-4.637-7.317-8.997-14.171-13.231-20.75 c-3.812-5.925-7.53-10.749-11.042-14.351c-3.109-3.189-6.652-5.657-10.796-7.554c-3.91-1.785-8.881-2.681-14.762-2.681 c-7.501,0-14.31,2.055-20.83,6.277c-6.452,4.176-10.912,9.339-13.636,15.785c-2.391,6.126-3.656,15.513-3.656,27.63v77.626h-67.07 C8.246,172.326,0,180.574,0,190.755c0,10.181,8.246,18.424,18.424,18.424h67.07v65.113h-67.07C8.246,274.292,0,282.538,0,292.722 C0,302.9,8.246,311.14,18.424,311.14h67.07v103.143c0,12.797,2.689,22.378,8.015,28.466c5.065,5.805,11.487,8.5,20.208,8.5 c8.414,0,14.786-2.707,20.07-8.523c5.411-5.958,8.148-15.533,8.148-28.442V311.14h115.308l62.399,95.683 c4.339,6.325,8.819,12.709,13.287,18.969c4.031,5.621,8.429,10.574,13.069,14.711c4.179,3.742,8.659,6.484,13.316,8.157 c4.794,1.726,10.397,2.601,16.615,2.601c16.875,0,34.158-5.166,34.158-43.479V311.14h67.743c10.179,0,18.43-8.252,18.43-18.43 C496.262,282.532,488.011,274.28,477.832,274.28z M355.054,209.173v65.106h-60.041l-43.021-65.106H355.054z M141.936,134.364 l24.76,37.956h-24.76V134.364z M141.936,274.28v-65.106h48.802l42.466,65.106H141.936z M355.054,365.153l-35.683-54.013h35.683 V365.153z" />{" "}
              </svg>
              {totalExpenses}
            </h3>
          </div>
        </div>
      </section>

      <section className="dashboard-section-two dashboard-income-cx">
        <div
          className="income-section-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "10px",
          }}
        >
          <h1>Recent Income</h1>
          <NavLink
            to="/ebcfinance/views/income"
            onClick={() =>
              setSelect({
                dashboard: "",
                income: "select",
                expenses: "",
                report: "",
              })
            }
          >
            View All
          </NavLink>
        </div>

        <div className="income-title">
          {incomes.slice(0, 3).map((income, i) => (
            <div
              className="show-income-cx"
              style={{ borderBottom: `solid 2px ${income?.color}` }}
            >
              {/* <span
                className="income-icon"
                style={{ backgroundColor: `${income?.color}` }}
              ></span> */}

              <div className="desc-cx">
                <h4>{income.date}</h4>
                <h3>{income.incomeSource}</h3>
              </div>

              <div className="amount-cx">
                <svg
                  fill="#ffffff"
                  version="1.1"
                  id="Capa_1"
                  style={{ fill: "black" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  height="30px"
                  viewBox="0 0 496.262 496.262"
                >
                  <path d="M477.832,274.28h-67.743v-65.106h67.743c10.179,0,18.43-8.243,18.43-18.424c0-10.182-8.251-18.43-18.43-18.43h-67.743 V81.982c0-13.187-2.606-22.866-7.743-28.762c-4.882-5.609-11.301-8.219-20.19-8.219c-8.482,0-14.659,2.592-19.447,8.166 c-5.077,5.902-7.654,15.599-7.654,28.821v90.343H227.627l-54.181-81.988c-4.637-7.317-8.997-14.171-13.231-20.75 c-3.812-5.925-7.53-10.749-11.042-14.351c-3.109-3.189-6.652-5.657-10.796-7.554c-3.91-1.785-8.881-2.681-14.762-2.681 c-7.501,0-14.31,2.055-20.83,6.277c-6.452,4.176-10.912,9.339-13.636,15.785c-2.391,6.126-3.656,15.513-3.656,27.63v77.626h-67.07 C8.246,172.326,0,180.574,0,190.755c0,10.181,8.246,18.424,18.424,18.424h67.07v65.113h-67.07C8.246,274.292,0,282.538,0,292.722 C0,302.9,8.246,311.14,18.424,311.14h67.07v103.143c0,12.797,2.689,22.378,8.015,28.466c5.065,5.805,11.487,8.5,20.208,8.5 c8.414,0,14.786-2.707,20.07-8.523c5.411-5.958,8.148-15.533,8.148-28.442V311.14h115.308l62.399,95.683 c4.339,6.325,8.819,12.709,13.287,18.969c4.031,5.621,8.429,10.574,13.069,14.711c4.179,3.742,8.659,6.484,13.316,8.157 c4.794,1.726,10.397,2.601,16.615,2.601c16.875,0,34.158-5.166,34.158-43.479V311.14h67.743c10.179,0,18.43-8.252,18.43-18.43 C496.262,282.532,488.011,274.28,477.832,274.28z M355.054,209.173v65.106h-60.041l-43.021-65.106H355.054z M141.936,134.364 l24.76,37.956h-24.76V134.364z M141.936,274.28v-65.106h48.802l42.466,65.106H141.936z M355.054,365.153l-35.683-54.013h35.683 V365.153z" />{" "}
                </svg>
                {/* <img src={naira} alt="naira" width="23px" height="30px" /> */}
                <h1 style={{ display: "flex", alignItems: "center" }}>
                  {income.amount}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-section-two dashboard-expenses-cx">
        <div
          className="expenses-section-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "10px",
          }}
        >
          <h1>Recent Expenses</h1>
          <NavLink
            to="/ebcfinance/views/expenses"
            onClick={() =>
              setSelect({
                dashboard: "",
                income: "",
                expenses: "select",
                report: "",
              })
            }
          >
            View All
          </NavLink>
        </div>
        <div className="income-title">
          {expenses.slice(0, 3).map((expense, i) => (
            <div
              className="show-income-cx"
              style={{ borderBottom: `solid 2px ${expense?.color}` }}
            >
              {/* <span
                className="income-icon"
                style={{ backgroundColor: `${expense?.color}` }}
              ></span> */}

              <div className="desc-cx">
                <h4>{expense.date}</h4>
                <h3>{expense.expensesCategory}</h3>
                <h4 styel={{ color: "gray" }}>{expense.desc}</h4>
              </div>

              <div className="amount-cx">
                <svg
                  fill="#ffffff"
                  version="1.1"
                  id="Capa_1"
                  style={{ fill: "black" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  height="30px"
                  viewBox="0 0 496.262 496.262"
                >
                  <path d="M477.832,274.28h-67.743v-65.106h67.743c10.179,0,18.43-8.243,18.43-18.424c0-10.182-8.251-18.43-18.43-18.43h-67.743 V81.982c0-13.187-2.606-22.866-7.743-28.762c-4.882-5.609-11.301-8.219-20.19-8.219c-8.482,0-14.659,2.592-19.447,8.166 c-5.077,5.902-7.654,15.599-7.654,28.821v90.343H227.627l-54.181-81.988c-4.637-7.317-8.997-14.171-13.231-20.75 c-3.812-5.925-7.53-10.749-11.042-14.351c-3.109-3.189-6.652-5.657-10.796-7.554c-3.91-1.785-8.881-2.681-14.762-2.681 c-7.501,0-14.31,2.055-20.83,6.277c-6.452,4.176-10.912,9.339-13.636,15.785c-2.391,6.126-3.656,15.513-3.656,27.63v77.626h-67.07 C8.246,172.326,0,180.574,0,190.755c0,10.181,8.246,18.424,18.424,18.424h67.07v65.113h-67.07C8.246,274.292,0,282.538,0,292.722 C0,302.9,8.246,311.14,18.424,311.14h67.07v103.143c0,12.797,2.689,22.378,8.015,28.466c5.065,5.805,11.487,8.5,20.208,8.5 c8.414,0,14.786-2.707,20.07-8.523c5.411-5.958,8.148-15.533,8.148-28.442V311.14h115.308l62.399,95.683 c4.339,6.325,8.819,12.709,13.287,18.969c4.031,5.621,8.429,10.574,13.069,14.711c4.179,3.742,8.659,6.484,13.316,8.157 c4.794,1.726,10.397,2.601,16.615,2.601c16.875,0,34.158-5.166,34.158-43.479V311.14h67.743c10.179,0,18.43-8.252,18.43-18.43 C496.262,282.532,488.011,274.28,477.832,274.28z M355.054,209.173v65.106h-60.041l-43.021-65.106H355.054z M141.936,134.364 l24.76,37.956h-24.76V134.364z M141.936,274.28v-65.106h48.802l42.466,65.106H141.936z M355.054,365.153l-35.683-54.013h35.683 V365.153z" />{" "}
                </svg>
                {/* <img src={naira} alt="naira" width="23px" height="30px" /> */}
                <h1 style={{ display: "flex", alignItems: "center" }}>
                  {expense.amount}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

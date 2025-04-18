import React, { useState, useEffect } from "react";
import { useNavigate,NavLink } from "react-router-dom";
import "./expensestyles/expensestyles.css";
export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState();
  const [loginUserDetail, setLoginUserDetail] = useState({});
      const [mouseEnter, setMouseEnter] = useState("");
  const navigate = useNavigate();
  const monthsArrAy = [
    "All",
    "January",
    "February",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    const storedExpense = JSON.parse(localStorage.getItem("expenses")) || [];
    const storedUserDetails =
    JSON.parse(localStorage.getItem("loginUserDetails")) || null;
    // Update state with retrieved values
   
    setLoginUserDetail(storedUserDetails);
    // Update state with retrieved values
    setExpenses(storedExpense);

    const totalExpenses = storedExpense.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );
    setTotalExpenses(totalExpenses);
    // setTotalExpenses(totalExpenses);
  }, []);
  const handleMouseEnter = () => {
    if (mouseEnter === "") {
      setMouseEnter("mouseEnter");
    } else {
      setMouseEnter("");
    }
  };
  // console.log(expenses);
  return (
    <main className="expense-main">
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
      <section className="income-main-month-title-cx">
        <div className="month-btn-cx">
          {monthsArrAy.slice(0, 4).map((month, i) => (
            <button key={month} type="button" className="month-btn">
              {month}
            </button>
          ))}
        </div>
        <div className="income-main-title">
          <h3>Total Expenses:</h3>
          <h3 style={{display:'flex', alignItems:'center'}}>
          <svg
                    fill="#ffffff"
                    version="1.1"
                    style={{ fill: "black" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    viewBox="0 0 496.262 496.262"
                  >
                    <path d="M477.832,274.28h-67.743v-65.106h67.743c10.179,0,18.43-8.243,18.43-18.424c0-10.182-8.251-18.43-18.43-18.43h-67.743 V81.982c0-13.187-2.606-22.866-7.743-28.762c-4.882-5.609-11.301-8.219-20.19-8.219c-8.482,0-14.659,2.592-19.447,8.166 c-5.077,5.902-7.654,15.599-7.654,28.821v90.343H227.627l-54.181-81.988c-4.637-7.317-8.997-14.171-13.231-20.75 c-3.812-5.925-7.53-10.749-11.042-14.351c-3.109-3.189-6.652-5.657-10.796-7.554c-3.91-1.785-8.881-2.681-14.762-2.681 c-7.501,0-14.31,2.055-20.83,6.277c-6.452,4.176-10.912,9.339-13.636,15.785c-2.391,6.126-3.656,15.513-3.656,27.63v77.626h-67.07 C8.246,172.326,0,180.574,0,190.755c0,10.181,8.246,18.424,18.424,18.424h67.07v65.113h-67.07C8.246,274.292,0,282.538,0,292.722 C0,302.9,8.246,311.14,18.424,311.14h67.07v103.143c0,12.797,2.689,22.378,8.015,28.466c5.065,5.805,11.487,8.5,20.208,8.5 c8.414,0,14.786-2.707,20.07-8.523c5.411-5.958,8.148-15.533,8.148-28.442V311.14h115.308l62.399,95.683 c4.339,6.325,8.819,12.709,13.287,18.969c4.031,5.621,8.429,10.574,13.069,14.711c4.179,3.742,8.659,6.484,13.316,8.157 c4.794,1.726,10.397,2.601,16.615,2.601c16.875,0,34.158-5.166,34.158-43.479V311.14h67.743c10.179,0,18.43-8.252,18.43-18.43 C496.262,282.532,488.011,274.28,477.832,274.28z M355.054,209.173v65.106h-60.041l-43.021-65.106H355.054z M141.936,134.364 l24.76,37.956h-24.76V134.364z M141.936,274.28v-65.106h48.802l42.466,65.106H141.936z M355.054,365.153l-35.683-54.013h35.683 V365.153z" />{" "}
                  </svg>
            {totalExpenses}</h3>
        </div>
      </section>

      <section className="income-main-content">
        {expenses.map((expense, i) => (
          <div
            key={expense.id}
            onClick={() => {
              navigate(`/ebcfinance/expense/ ${expense.id}`);
            }}
            className="income-cx"
            style={{ borderBottom: `solid ${expense?.color}` }}
          >
            <span
              className="income-main-icon"
              style={{ backgroundColor: `${expense?.color}`, height: "100%" }}
            ></span>

            <div className="income-desc-cx">
              <div className="income-amount-cx">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingRight: "10px",
                  }}
                >
                  <h3 style={{ color: "#a9a9a9" }}>Amount</h3>
                  <p
                    style={{
                      color: `${expense?.color} `,
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    {expense?.date}
                  </p>
                </div>

                <h1
                  style={{
                    display: "flex",
                    gap: "2px",
                    fontSize: "2em",
                    textAlign: "center",
                    alignItems: "center",
                    marginTop: "-5px",
                  }}
                >
                  <svg
                    fill="#ffffff"
                    version="1.1"
                    style={{ fill: "black" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 496.262 496.262"
                  >
                    <path d="M477.832,274.28h-67.743v-65.106h67.743c10.179,0,18.43-8.243,18.43-18.424c0-10.182-8.251-18.43-18.43-18.43h-67.743 V81.982c0-13.187-2.606-22.866-7.743-28.762c-4.882-5.609-11.301-8.219-20.19-8.219c-8.482,0-14.659,2.592-19.447,8.166 c-5.077,5.902-7.654,15.599-7.654,28.821v90.343H227.627l-54.181-81.988c-4.637-7.317-8.997-14.171-13.231-20.75 c-3.812-5.925-7.53-10.749-11.042-14.351c-3.109-3.189-6.652-5.657-10.796-7.554c-3.91-1.785-8.881-2.681-14.762-2.681 c-7.501,0-14.31,2.055-20.83,6.277c-6.452,4.176-10.912,9.339-13.636,15.785c-2.391,6.126-3.656,15.513-3.656,27.63v77.626h-67.07 C8.246,172.326,0,180.574,0,190.755c0,10.181,8.246,18.424,18.424,18.424h67.07v65.113h-67.07C8.246,274.292,0,282.538,0,292.722 C0,302.9,8.246,311.14,18.424,311.14h67.07v103.143c0,12.797,2.689,22.378,8.015,28.466c5.065,5.805,11.487,8.5,20.208,8.5 c8.414,0,14.786-2.707,20.07-8.523c5.411-5.958,8.148-15.533,8.148-28.442V311.14h115.308l62.399,95.683 c4.339,6.325,8.819,12.709,13.287,18.969c4.031,5.621,8.429,10.574,13.069,14.711c4.179,3.742,8.659,6.484,13.316,8.157 c4.794,1.726,10.397,2.601,16.615,2.601c16.875,0,34.158-5.166,34.158-43.479V311.14h67.743c10.179,0,18.43-8.252,18.43-18.43 C496.262,282.532,488.011,274.28,477.832,274.28z M355.054,209.173v65.106h-60.041l-43.021-65.106H355.054z M141.936,134.364 l24.76,37.956h-24.76V134.364z M141.936,274.28v-65.106h48.802l42.466,65.106H141.936z M355.054,365.153l-35.683-54.013h35.683 V365.153z" />{" "}
                  </svg>
                  {expense.amount}
                </h1>
              </div>

              <div>
                <h3 style={{ color: "#a9a9a9" }}>Given to:</h3>
                <h2>{expense.expensesCategory}</h2>
              </div>
              <div >
                <p style={{fontSize:'1.2em', }}>{expense.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

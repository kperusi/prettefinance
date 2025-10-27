import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./expensestyles/expensestyles.css";
import backbtn from "../images/arrow_back_ios_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import forwardbtn from "../images/arrow_forward_ios_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import { Splitter } from "../Splitter";
import { NextPage } from "../NextPages";
import { ListOfMonths } from "../ListOfMonths";
import { FormatedDate } from "../FormatedDate";
import { useDispatch, useSelector } from "react-redux";
import Search from "../Filter/Search";
import Filter from "../Filter/Filter";
import { handleShowFilterOption } from "../store/storeSlice";
import { TruncateTex } from "../TruncateText";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState();
  const [loginUserDetail, setLoginUserDetail] = useState({});
  const [mouseEnter, setMouseEnter] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const monthsArrAy = ListOfMonths(new Date().getFullYear());
  const dispatch = useDispatch();
  const [displayedExpenses, setDisplayedExpenses] = useState([]);
  const [filteredTotalExpenesesAmount, setFilterTotalExpensesAmount] =
    useState();
  const [displayedTotalExpenses, setDisplayedTotalExpenses] = useState();
  const selectedMonth = useSelector((state) => state.sliceData.selectedMonth);
  const filteredExpenses = useSelector(
    (state) => state.sliceData.filteredIncome_Expenses
  );
  const catArray = [
    "Allocation",
    "Associational Dues",
    "Building Committee",
    "Conference Dues",
    "Convention Dues",
    "Counter Committee",
    "Cooperative Payment",
    "Decoration Committee",
    "Electrical Department",
    "Finance/Stewardship Committee",
    "Generator Department",
    "Health Department",
    "Media Department",
    "Music Department",
    "Publicity Committee",
    "Salary Payment",
    "Sanitation Committee",
    " Social/Warfare Committee",
    "Sound Department",
    "Transport Committee",
    "Others",
  ];
  const [account_type, setAccount_type] = useState();

  useEffect(() => {
    const storedAccount_type = JSON.parse(localStorage.getItem("account_type"));
    setAccount_type(storedAccount_type);
  }, []);

  useEffect(() => {
    // const storedExpense = JSON.parse(localStorage.getItem("expenses")) || [];
    const storedExpense =
      JSON.parse(localStorage.getItem(`${account_type} expenses`)) || [];

    const storedUserDetails =
      JSON.parse(localStorage.getItem("loginUserDetails")) || null;
    // Update state with retrieved values

    setLoginUserDetail(storedUserDetails);
    // Update state with retrieved values
   
    setExpenses(storedExpense);

    const total_Expenses = storedExpense.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );
    setTotalExpenses(total_Expenses);

    const totalFilteredExpenses = filteredExpenses.reduce(
      (sum, each) => sum + (each.amount || 0),
      0
    );

    setFilterTotalExpensesAmount(totalFilteredExpenses);
 console.log(expenses);
    // return () => {
    //   dispatch(handleShowFilterOption("close"));
    // };
  }, [filteredExpenses, account_type]);

  const handleMouseEnter = () => {
    if (mouseEnter === "") {
      setMouseEnter("mouseEnter");
    } else {
      setMouseEnter("");
    }
  };

  console.log(account_type);
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
          </NavLink>
        </section>
      )}
      <section className="income-main-month-title-cx">
        <div className="heading-cx">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="white"
            >
              <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" />
            </svg>
          </span>
          <p> Expenses</p>

          <span className="moon-cx">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              color="blue"
              height="30px"
              // viewBox="0 -960 960 960"
              width="30px"
              class="moon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                strokeWidth="1.2"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          </span>
        </div>
        <div className="income-search-filter-cx">
          <Search />
          <Filter name="expenses" catArray={catArray} desc="Category" />
        </div>

        <div className="income-main-title">
          {filteredExpenses.length > 0 ? (
            <div>
              <p>Total Expenses:</p>
              <h2 style={{ display: "flex", alignItems: "center" }}>
                <svg
                  fill="#ffffff"
                  version="1.1"
                  style={{ fill: "black" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 496.262 496.262"
                >
                  <path d="M477.832,274.28h-67.743v-65.106h67.743c10.179,0,18.43-8.243,18.43-18.424c0-10.182-8.251-18.43-18.43-18.43h-67.743 V81.982c0-13.187-2.606-22.866-7.743-28.762c-4.882-5.609-11.301-8.219-20.19-8.219c-8.482,0-14.659,2.592-19.447,8.166 c-5.077,5.902-7.654,15.599-7.654,28.821v90.343H227.627l-54.181-81.988c-4.637-7.317-8.997-14.171-13.231-20.75 c-3.812-5.925-7.53-10.749-11.042-14.351c-3.109-3.189-6.652-5.657-10.796-7.554c-3.91-1.785-8.881-2.681-14.762-2.681 c-7.501,0-14.31,2.055-20.83,6.277c-6.452,4.176-10.912,9.339-13.636,15.785c-2.391,6.126-3.656,15.513-3.656,27.63v77.626h-67.07 C8.246,172.326,0,180.574,0,190.755c0,10.181,8.246,18.424,18.424,18.424h67.07v65.113h-67.07C8.246,274.292,0,282.538,0,292.722 C0,302.9,8.246,311.14,18.424,311.14h67.07v103.143c0,12.797,2.689,22.378,8.015,28.466c5.065,5.805,11.487,8.5,20.208,8.5 c8.414,0,14.786-2.707,20.07-8.523c5.411-5.958,8.148-15.533,8.148-28.442V311.14h115.308l62.399,95.683 c4.339,6.325,8.819,12.709,13.287,18.969c4.031,5.621,8.429,10.574,13.069,14.711c4.179,3.742,8.659,6.484,13.316,8.157 c4.794,1.726,10.397,2.601,16.615,2.601c16.875,0,34.158-5.166,34.158-43.479V311.14h67.743c10.179,0,18.43-8.252,18.43-18.43 C496.262,282.532,488.011,274.28,477.832,274.28z M355.054,209.173v65.106h-60.041l-43.021-65.106H355.054z M141.936,134.364 l24.76,37.956h-24.76V134.364z M141.936,274.28v-65.106h48.802l42.466,65.106H141.936z M355.054,365.153l-35.683-54.013h35.683 V365.153z" />{" "}
                </svg>
                {Splitter(filteredTotalExpenesesAmount)}
              </h2>
            </div>
          ) : (
            <div>
              <p>Total Expenses:</p>
              <h2 style={{ display: "flex", alignItems: "center" }}>
                <svg
                  fill="#ffffff"
                  version="1.1"
                  style={{ fill: "black" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 496.262 496.262"
                >
                  <path d="M477.832,274.28h-67.743v-65.106h67.743c10.179,0,18.43-8.243,18.43-18.424c0-10.182-8.251-18.43-18.43-18.43h-67.743 V81.982c0-13.187-2.606-22.866-7.743-28.762c-4.882-5.609-11.301-8.219-20.19-8.219c-8.482,0-14.659,2.592-19.447,8.166 c-5.077,5.902-7.654,15.599-7.654,28.821v90.343H227.627l-54.181-81.988c-4.637-7.317-8.997-14.171-13.231-20.75 c-3.812-5.925-7.53-10.749-11.042-14.351c-3.109-3.189-6.652-5.657-10.796-7.554c-3.91-1.785-8.881-2.681-14.762-2.681 c-7.501,0-14.31,2.055-20.83,6.277c-6.452,4.176-10.912,9.339-13.636,15.785c-2.391,6.126-3.656,15.513-3.656,27.63v77.626h-67.07 C8.246,172.326,0,180.574,0,190.755c0,10.181,8.246,18.424,18.424,18.424h67.07v65.113h-67.07C8.246,274.292,0,282.538,0,292.722 C0,302.9,8.246,311.14,18.424,311.14h67.07v103.143c0,12.797,2.689,22.378,8.015,28.466c5.065,5.805,11.487,8.5,20.208,8.5 c8.414,0,14.786-2.707,20.07-8.523c5.411-5.958,8.148-15.533,8.148-28.442V311.14h115.308l62.399,95.683 c4.339,6.325,8.819,12.709,13.287,18.969c4.031,5.621,8.429,10.574,13.069,14.711c4.179,3.742,8.659,6.484,13.316,8.157 c4.794,1.726,10.397,2.601,16.615,2.601c16.875,0,34.158-5.166,34.158-43.479V311.14h67.743c10.179,0,18.43-8.252,18.43-18.43 C496.262,282.532,488.011,274.28,477.832,274.28z M355.054,209.173v65.106h-60.041l-43.021-65.106H355.054z M141.936,134.364 l24.76,37.956h-24.76V134.364z M141.936,274.28v-65.106h48.802l42.466,65.106H141.936z M355.054,365.153l-35.683-54.013h35.683 V365.153z" />{" "}
                </svg>
                {Splitter(totalExpenses)}
              </h2>
            </div>
          )}
        </div>
      </section>

      <section className="income-main-content">
        {filteredExpenses.length > 0 ? (
          <div className="items-list-x">
            {filteredExpenses.map((expense, i) => (
              <div
                key={expense.id}
                onClick={() => {
                  navigate(`/ebcfinance/expense/ ${expense.id}`);
                }}
                className="income-cx"
                style={{ borderTop: `solid ${expense?.color}` }}
              >
                <span
                  className="income-main-icon"
                  style={{
                    backgroundColor: `${expense?.color}`,
                    height: "100%",
                  }}
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
                          // color: `${expense?.color} `,
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        {FormatedDate(expense?.date)}
                      </p>
                    </div>

                    <h1
                      style={{
                        display: "flex",
                        gap: "2px",
                        fontSize: "1.2rem",
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
                        width="20px"
                        height="20px"
                        viewBox="0 0 496.262 496.262"
                      >
                        <path d="M477.832,274.28h-67.743v-65.106h67.743c10.179,0,18.43-8.243,18.43-18.424c0-10.182-8.251-18.43-18.43-18.43h-67.743 V81.982c0-13.187-2.606-22.866-7.743-28.762c-4.882-5.609-11.301-8.219-20.19-8.219c-8.482,0-14.659,2.592-19.447,8.166 c-5.077,5.902-7.654,15.599-7.654,28.821v90.343H227.627l-54.181-81.988c-4.637-7.317-8.997-14.171-13.231-20.75 c-3.812-5.925-7.53-10.749-11.042-14.351c-3.109-3.189-6.652-5.657-10.796-7.554c-3.91-1.785-8.881-2.681-14.762-2.681 c-7.501,0-14.31,2.055-20.83,6.277c-6.452,4.176-10.912,9.339-13.636,15.785c-2.391,6.126-3.656,15.513-3.656,27.63v77.626h-67.07 C8.246,172.326,0,180.574,0,190.755c0,10.181,8.246,18.424,18.424,18.424h67.07v65.113h-67.07C8.246,274.292,0,282.538,0,292.722 C0,302.9,8.246,311.14,18.424,311.14h67.07v103.143c0,12.797,2.689,22.378,8.015,28.466c5.065,5.805,11.487,8.5,20.208,8.5 c8.414,0,14.786-2.707,20.07-8.523c5.411-5.958,8.148-15.533,8.148-28.442V311.14h115.308l62.399,95.683 c4.339,6.325,8.819,12.709,13.287,18.969c4.031,5.621,8.429,10.574,13.069,14.711c4.179,3.742,8.659,6.484,13.316,8.157 c4.794,1.726,10.397,2.601,16.615,2.601c16.875,0,34.158-5.166,34.158-43.479V311.14h67.743c10.179,0,18.43-8.252,18.43-18.43 C496.262,282.532,488.011,274.28,477.832,274.28z M355.054,209.173v65.106h-60.041l-43.021-65.106H355.054z M141.936,134.364 l24.76,37.956h-24.76V134.364z M141.936,274.28v-65.106h48.802l42.466,65.106H141.936z M355.054,365.153l-35.683-54.013h35.683 V365.153z" />{" "}
                      </svg>
                      {Splitter(expense.amount)}
                    </h1>
                  </div>

                  <div>
                    <p style={{ color: "#a9a9a9", marginBottom: "-10px" }}>
                      Given to:
                    </p>
                    <h2 style={{ fontSize: "1.2rem" }}>
                      {expense.expensesCategory}
                    </h2>
                  </div>
                  <div>
                    <p>{TruncateTex(expense.desc, 90)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="items-list-x">
            {expenses.map((expense, i) => (
              <div
                key={expense.id}
                onClick={() => {
                  navigate(`/ebcfinance/expense/ ${expense.id}`);
                }}
                className="income-cx"
                style={{ borderTop: `solid ${expense?.color} 4px` }}
              >
                <span
                  className="income-main-icon"
                  style={{
                    backgroundColor: `${expense?.color}`,
                    height: "100%",
                  }}
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
                          // color: `${expense?.color} `,
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        {FormatedDate(expense?.date)}
                      </p>
                    </div>

                    <h1
                      style={{
                        display: "flex",
                        gap: "2px",
                        fontSize: "1.2rem",
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
                        width="20px"
                        height="20px"
                        viewBox="0 0 496.262 496.262"
                      >
                        <path d="M477.832,274.28h-67.743v-65.106h67.743c10.179,0,18.43-8.243,18.43-18.424c0-10.182-8.251-18.43-18.43-18.43h-67.743 V81.982c0-13.187-2.606-22.866-7.743-28.762c-4.882-5.609-11.301-8.219-20.19-8.219c-8.482,0-14.659,2.592-19.447,8.166 c-5.077,5.902-7.654,15.599-7.654,28.821v90.343H227.627l-54.181-81.988c-4.637-7.317-8.997-14.171-13.231-20.75 c-3.812-5.925-7.53-10.749-11.042-14.351c-3.109-3.189-6.652-5.657-10.796-7.554c-3.91-1.785-8.881-2.681-14.762-2.681 c-7.501,0-14.31,2.055-20.83,6.277c-6.452,4.176-10.912,9.339-13.636,15.785c-2.391,6.126-3.656,15.513-3.656,27.63v77.626h-67.07 C8.246,172.326,0,180.574,0,190.755c0,10.181,8.246,18.424,18.424,18.424h67.07v65.113h-67.07C8.246,274.292,0,282.538,0,292.722 C0,302.9,8.246,311.14,18.424,311.14h67.07v103.143c0,12.797,2.689,22.378,8.015,28.466c5.065,5.805,11.487,8.5,20.208,8.5 c8.414,0,14.786-2.707,20.07-8.523c5.411-5.958,8.148-15.533,8.148-28.442V311.14h115.308l62.399,95.683 c4.339,6.325,8.819,12.709,13.287,18.969c4.031,5.621,8.429,10.574,13.069,14.711c4.179,3.742,8.659,6.484,13.316,8.157 c4.794,1.726,10.397,2.601,16.615,2.601c16.875,0,34.158-5.166,34.158-43.479V311.14h67.743c10.179,0,18.43-8.252,18.43-18.43 C496.262,282.532,488.011,274.28,477.832,274.28z M355.054,209.173v65.106h-60.041l-43.021-65.106H355.054z M141.936,134.364 l24.76,37.956h-24.76V134.364z M141.936,274.28v-65.106h48.802l42.466,65.106H141.936z M355.054,365.153l-35.683-54.013h35.683 V365.153z" />{" "}
                      </svg>
                      {Splitter(expense.amount)}
                    </h1>
                  </div>

                  <div>
                    <p style={{ color: "#a9a9a9", marginBottom: "-7px" }}>
                      Given to:
                    </p>
                    <h2 style={{ fontSize: "1.2rem" }}>
                      {expense.expensesCategory}
                    </h2>
                  </div>
                  <div>
                    <p>{TruncateTex(expense.desc, 90)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import "./transactionstyle/transactionstyles.css";
export default function TransactionLayout() {

  const {id}=useParams()
  const [selected, setSelected] = useState({
    income: "selected",
    expenses: "",
  });
  const navigate = useNavigate();
  const handleSelected = (name) => {
    if (name === "income") {
      setSelected({ income: "selected", expenses: "" });
    }
    if (name === "expenses") {
      setSelected({ income: "", expenses: "selected" });
    }
  };

  console.log(id)
  return (
    <main className="layout">
      <section className="layout-nav-cx">
        <div className="layout-logo">
        <span
            onClick={() => {
              navigate("/ebcfinance/views");
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

            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="34px"
              fill="#add8e6"
            >
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
            </svg> */}
          </span>
          <h4 style={{ color: "white" }}>Add Transactions</h4>
        
        </div>
        <span className="divide"></span>
        <div className="row">
          <div className="navbar-item-cx">
            <NavLink
              to="addincome"
              onClick={() => handleSelected("income")}
              className={`layout-navlink ${selected.income}`}
            >
              <h4>Add Income</h4>
              <span className={`${selected.income}`}></span>
            </NavLink>
          </div>

          <div className="navbar-item-cx">
            <NavLink
              to="addexpenses"
              onClick={() => handleSelected("expenses")}
              className={`layout-navlink ${selected.expenses}`}
            >
              <h4> Add Expenses</h4>

              <span className={`${selected.expenses}`}></span>
            </NavLink>
          </div>
        </div>
      </section>

      <section className="layout-content-cx">
        <Outlet />
      </section>
    </main>
  );
}

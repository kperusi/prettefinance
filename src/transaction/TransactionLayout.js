import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import "./transactionstyle/transactionstyles.css";
export default function TransactionLayout() {
  const { id } = useParams();
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
  const [account_type, setAccount_type] = useState();

  useEffect(() => {
    const storedAccount_type = JSON.parse(localStorage.getItem("account_type"));
    setAccount_type(storedAccount_type);
  }, []);
  return (
    <main className="layout">
      <section className="layout-nav-cx">
        <div className="layout-logo">
          <span
          className="back btn"
            onClick={() => {
              navigate("/prettifinance/account/main");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="29px"
              viewBox="0 -960 960 960"
              width="29px"
              fill="darkblue"
            >
              <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" />
            </svg>

           
          </span>
          <div
          className="title-cx"
            
          >
            <h4 style={{ color: "darkblue" }}>Add Transactions</h4>
            <h4
              style={{ color: "grey", textAlign: "center" ,marginTop:'-5px'}}
            >{`${account_type}`}</h4>
          </div>
        </div>

        <div className="row">
          <div className="navbar-item-cx">
            <NavLink
              to="addincome"
              onClick={() => handleSelected("income")}
              className={`layout-navlink ${selected.income}`}
            >
              <span className={`${selected.income}`}></span>
              <h4>Add Income</h4>
            </NavLink>
          </div>

          <div className="navbar-item-cx">
            <NavLink
              to="addexpenses"
              onClick={() => handleSelected("expenses")}
              className={`layout-navlink ${selected.expenses}`}
            >
              <span className={`${selected.expenses}`}></span>
              <h4> Add Expenses</h4>
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

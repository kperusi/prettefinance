import React, { useEffect,} from "react";
import "./navbarstyles/navbaarstyles.css";
// import { useSelector, useDispatch } from "react-redux";
import { NavLink, } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleShowFilterOption } from "../store/storeSlice";

function Navbar({ setSelect, select, handleSelected }) {


  
  const dispatch = useDispatch();

  useEffect(() => {
    setSelect({ dashboard: "select", income: "", expenses: "", report: "" });
    if (window.location.pathname.includes("income")) {
      setSelect({ dashboard: "", income: "select", expenses: "", report: "" });
    }
    if (window.location.pathname.includes("expenses")) {
      setSelect({ dashboard: "", income: "", expenses: "select", report: "" });
    }
  }, []);

  return (
    <main className="mainnav" onClick={()=>{
      dispatch(handleShowFilterOption('close'))
      
    }}>
      <div
        className={`navbar-item-cx ${select.dashboard}`}
        onClick={() => {
         
          setSelect({ dashboard: "select", income: "", expenses: "" });
        }}
      >
        <NavLink to="" className={`navlink `}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#000000"
          >
            <path d="M120-840h320v320H120v-320Zm80 80v160-160Zm320-80h320v320H520v-320Zm80 80v160-160ZM120-440h320v320H120v-320Zm80 80v160-160Zm440-80h80v120h120v80H720v120h-80v-120H520v-80h120v-120Zm-40-320v160h160v-160H600Zm-400 0v160h160v-160H200Zm0 400v160h160v-160H200Z" />
          </svg>
          <h5>Dashboard</h5>
        </NavLink>
      </div>

      <div
        className={`navbar-item-cx ${select.income}`}
        onClick={() =>
          setSelect({
            dashboard: "",
            income: "select",
            expenses: "",
            report: "",
          })
        }
      >
        <NavLink to="income" className="navlink">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#000000"
          >
            <path d="M577.33-80v-66.67h196v-420H186.67v200H120v-380q0-27 19.83-46.83 19.84-19.83 46.84-19.83h56.66V-880h70v66.67h333.34V-880h70v66.67h56.66q27 0 46.84 19.83Q840-773.67 840-746.67v600q0 27-19.83 46.84Q800.33-80 773.33-80h-196ZM320-9.33 273.33-56 383-166.67H46.67v-66.66H383L273.33-344 320-390.67 510.67-200 320-9.33Zm-133.33-624h586.66v-113.34H186.67v113.34Zm0 0v-113.34 113.34Z" />
          </svg>
          <h5>Income</h5>
        </NavLink>
      </div>

      <div
        className={`navbar-item-cx ${select.expenses}`}
        onClick={() =>
          setSelect({
            dashboard: "",
            income: "",
            expenses: "select",
            report: "",
          })
        }
      >
        <NavLink to="expenses" className="navlink">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#000000"
          >
            <path d="M120-840h320v320H120v-320Zm80 80v160-160Zm320-80h320v320H520v-320Zm80 80v160-160ZM120-440h320v320H120v-320Zm80 80v160-160Zm440-80h80v120h120v80H720v120h-80v-120H520v-80h120v-120Zm-40-320v160h160v-160H600Zm-400 0v160h160v-160H200Zm0 400v160h160v-160H200Z" />
          </svg>
          <h5>Expenses</h5>
        </NavLink>
      </div>
      <div className="navbar-item-cx">
        <NavLink to="/ebcfinance/generatereport" className="navlink">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#000000"
          >
            <path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z" />
          </svg>
          <h5>Report</h5>
        </NavLink>
      </div>
    </main>
  );
}

export default Navbar;

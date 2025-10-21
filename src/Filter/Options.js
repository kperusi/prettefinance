import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { ListOfMonths } from "../ListOfMonths";
import "./filterstyles/optionstyle.css";
import {
  handleFilteredIncome,
  handleSelectedMonthAndSource,
  handleShowFilterOption,
} from "../store/storeSlice";
import { TruncateTex } from "../TruncateText";

function Options(props) {
  const months = ListOfMonths(new Date().getFullYear());
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedIndex, setSelectedIndex] = useState();
  const [filterArray, setFilterArray] = useState([]);
  const [selectedMonthArray, setSelectedMonthArray] = useState([]);
  const [selectedCat, setSelectedCat] = useState();
  const [catIndex, setCatIndex] = useState("");
  const [count, setCount] = useState(0);
  const [uniqueMonthArray, setUniqueMonthArray] = useState(new Set());

  const handleSelectedMonth = (month, index) => {
    setSelectedMonth(month);
    setSelectedIndex(index);

    selectedMonthArray.push(month);

    // filterArray[0] = month;

    if (uniqueMonthArray.has(month)) {
      uniqueMonthArray.delete(month);
    } else {
      setUniqueMonthArray(new Set([...uniqueMonthArray, month]));
    }
console.log(uniqueMonthArray)
    
  };



  useEffect(()=>{
    setFilterArray(Array.from(uniqueMonthArray));
  },[uniqueMonthArray])
  const handleSelectedCat = (cat, index) => {
    setSelectedCat(cat);
    setCatIndex(index);
    filterArray[1] = cat;
  };
  console.log(filterArray);
  const handleApplyFilter = () => {
    props.handleFilterItem(uniqueMonthArray);
    // dispatch(handleSelectedMonthAndSource(selectedMonth,selectedCat))
    dispatch(handleShowFilterOption("close"));
  };
  console.log(uniqueMonthArray);
  return (
    <main className="option-main">
      <button
        className="option-close-btn"
        onClick={() => dispatch(handleShowFilterOption("close"))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#1f1f1f"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </button>
      <div className="months-cx">
        <h3>Months</h3>

        <ul>
          {months.slice(1).map((month, index) => (
            <li
              className={`month-input-label-cx ${
                uniqueMonthArray.has(month)
                  ? "option-active"
                  : "option-no-active "
                //selectedIndex === index ? "option-active" : " "
              }`}
              onClick={() => {
                handleSelectedMonth(month, index);
              }}
            >
              {month}
            </li>
          ))}
        </ul>

        <h3>{props.desc}</h3>
        <div className="option-cat-cx">
          <ul>
            {props.catArray.map((cat, index) => (
              <li
                className={`month-input-label-cx ${
                  catIndex === index ? "option-active" : "option-no-active"
                }`}
                onClick={() => handleSelectedCat(cat, index)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr></hr>
      {/* <div className="filter-list-cx">
        {filterArray && (
          <div>
            {filterArray.map((item, i) => (
              <button key={i}>{TruncateTex(item, 20)}</button>
            ))}
          </div>
        )}
      </div> */}
      {(selectedMonth || selectedCat) && (
        <div className="apply-filter-btn-cx">
          <button>Clear Filters</button>
          <button onClick={() => handleApplyFilter()}>Apply Filters</button>
        </div>
      )}
    </main>
  );
}

export default Options;

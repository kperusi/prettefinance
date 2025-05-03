import React, { useState, useEffect } from "react";
import Option from "./Options";
import "./filterstyles/filterstyles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFilteredIncome_Expenses,
  handleShowFilterOption,
} from "../store/storeSlice";
import { TruncateTex } from "../TruncateText";
export default function Filter({ name, catArray, desc }) {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sliceData.showFilterOption);
  const [filterItems, setFilterItems] = useState([]);
  const [income, setIncome] = useState([]);
  const expenses = useSelector((state) => state.sliceData.expenses);
  const [filteredIncome_expenses, setFilteredIncome_expenses] = useState([]);
  const [emptyFilter, setEmptyFilter] = useState(false);
  const filteredTransaction = useSelector(
    (state) => state.sliceData.filteredIncome_Expenses
  );

  const handleClearFilter = (items) => {};

  const handlefilterItem = (items) => {
    console.log("i am controlled from child");
    setFilterItems(items);
    const storedIncome = JSON.parse(localStorage.getItem("incomes")) || [];
    setIncome(storedIncome);
  };

  useEffect(() => {
    if (name === "income") {
      if (filterItems.length > 1) {
        const localFilteredIncome = income.filter(function (item) {
          const date = new Date(item.date);

          const month = date.toLocaleDateString("en-US", {
            month: "long",
          });

          return (
            filterItems.includes(month) &&
            filterItems.includes(item.incomeSource)
          );
        });

        setFilteredIncome_expenses(localFilteredIncome);
        dispatch(handleFilteredIncome_Expenses(localFilteredIncome));
      }
      if (filterItems.length <= 1) {
        const localFilteredIncome = income.filter(function (item) {
          const date = new Date(item.date);

          const month = date.toLocaleDateString("en-US", {
            month: "long",
          });

          return (
            filterItems.includes(month) ||
            filterItems.includes(item.incomeSource)
          );
        });

        setFilteredIncome_expenses(localFilteredIncome);
        dispatch(handleFilteredIncome_Expenses(localFilteredIncome));
      }

      if (filterItems[0] === undefined) {
        const localFilteredIncome = income.filter(function (item) {
          const date = new Date(item.date);

          const month = date.toLocaleDateString("en-US", {
            month: "long",
          });

          return (
            filterItems.includes(month) ||
            filterItems.includes(item.incomeSource)
          );
        });

        setFilteredIncome_expenses(localFilteredIncome);
        dispatch(handleFilteredIncome_Expenses(localFilteredIncome));
      }
    } else if (name === "expenses") {
      if (filterItems.length > 1) {
        const localFilteredExpenses = expenses.filter(function (item) {
          const date = new Date(item.date);

          const month = date.toLocaleDateString("en-US", {
            month: "long",
          });

          return (
            filterItems.includes(month) &&
            filterItems.includes(item.expensesCategory)
          );
        });

        setFilteredIncome_expenses(localFilteredExpenses);
        dispatch(handleFilteredIncome_Expenses(localFilteredExpenses));
      }
      if (filterItems.length <= 1) {
        const localFilteredExpenses = expenses.filter(function (item) {
          const date = new Date(item.date);

          const month = date.toLocaleDateString("en-US", {
            month: "long",
          });

          return (
            filterItems.includes(month) ||
            filterItems.includes(item.expensesCategory)
          );
        });

        setFilteredIncome_expenses(localFilteredExpenses);
        dispatch(handleFilteredIncome_Expenses(localFilteredExpenses));
      }

      if (filterItems[0] === undefined) {
        const localFilteredExpenses = expenses.filter(function (item) {
          const date = new Date(item.date);

          const month = date.toLocaleDateString("en-US", {
            month: "long",
          });

          return (
            filterItems.includes(month) ||
            filterItems.includes(item.expensesCategory)
          );
        });

        setFilteredIncome_expenses(localFilteredExpenses);
        dispatch(handleFilteredIncome_Expenses(localFilteredExpenses));
      }
    }
  }, [filterItems, income, name, expenses]);

  const handleDelectItem = (index) => {
    setFilterItems(filterItems.filter((item, i) => i !== index));
  };

  const handlefilterIncome = () => {
    const storedIncome = JSON.parse(localStorage.getItem("Income"));
    setIncome(storedIncome);
  };

  const handleCloseNotification = () => {
    setEmptyFilter(false);
  };

  return (
    <main className="filter-main">
   
      <section className="filter-btns-cx">
        <div
          className="filters-cx"
          onClick={() => dispatch(handleShowFilterOption("open"))}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" />
            </svg>
            <p style={{ textAlign: "center" }}>Filters</p>
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="white#"
            style={{ fill: "white" }}
          >
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        </div>
        {filterItems.length > 0 && (
          <div className="clearall-btn-cx">
            <button>Clear all</button>
          </div>
        )}
      </section>

      <section className={`filter-option-cx ${show}`}>
        <Option
          catArray={catArray}
          name={name}
          desc={desc}
          filterItems={filterItems}
          handleFilterItem={handlefilterItem}
        />
      </section>

      {filterItems.length > 0 && (
        <div className="filter-item-list-cx">
          {filterItems.map((item, i) => (
            <div
              className="filter-item-cx"
              key={i}
              onClick={() => handleDelectItem(i)}
            >
              <p style={{ lineHeight: "1rem", fontSize: ".9rem" }}>
                {TruncateTex(item, 20)}
              </p>
              <span className="filter-svg-cx">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="15px"
                  viewBox="0 -960 960 960"
                  width="15px"
                  fill="#1f1f1f"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

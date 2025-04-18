import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./singleincomestyle/singleincomestyles.css";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
export default function SingleIncome() {
  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState();
  const [singleIncome, setSingleIncome] = useState({});
  const [msg, setMsg] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loginUserDetail, setLoginUserDetail] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedIncome = JSON.parse(localStorage.getItem("incomes")) || [];
    // Update state with retrieved values
    setIncomes(storedIncome);
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    // Update state with retrieved values
    setExpenses(storedExpenses);
    const storedUserDetails =
      JSON.parse(localStorage.getItem("loginUserDetails")) || null;
    setLoginUserDetail(storedUserDetails);
    const totalIncome = storedIncome.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );

    const totalExpenses = storedExpenses.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );

    setTotalIncome(totalIncome);
    // setTotalExpenses(totalExpenses);
  }, []);

  useEffect(() => {
    const filterTasksById = (id) => {
      return incomes?.find((task) => task.id.trim() === id.trim());
    };
    const filterExpensesById = (id) => {
      return expenses?.find((task) => task.id.trim() === id.trim());
    };

    setSingleIncome(filterTasksById(id) || filterExpensesById(id));
  }, [incomes, id, expenses]);

  const handleDelete = async (id) => {
    // console.log(`delete ${id}`);

    if (singleIncome?.main === "Income") {
      try {
        console.log("deleting income");
        setLoading(true);
        await deleteDoc(doc(db, "Income", id))
          .then(() => {
            // Update local storage
            const updatedIncomes = JSON.parse(localStorage.getItem("incomes"));
            const updatedIncomesAfterDelete = updatedIncomes.filter(
              (income) => income.id !== id
            );
            localStorage.setItem(
              "incomes",
              JSON.stringify(updatedIncomesAfterDelete)
            );
            setLoading(false);
            console.log("income deleted successfully");
          })
          .catch((err) => console.log(err));
      } catch (error) {}
    } else if (singleIncome?.main === "Expenses") {
      try {
        console.log("deleting expenses");
        setLoading(true);
        await deleteDoc(doc(db, "Expenses", id))
          .then(() => {
            const updatedIncomes = JSON.parse(localStorage.getItem("expenses"));
            const updatedIncomesAfterDelete = updatedIncomes.filter(
              (expenses) => expenses.id !== id
            );
            localStorage.setItem(
              "expenses",
              JSON.stringify(updatedIncomesAfterDelete)
            );
            setLoading(false);
            console.log("expenses deleted successfully");
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }

    navigate(-1);
  };

  const handleEditingNavigation = (id) => {
    if (singleIncome?.main === "Expenses") {
      navigate(`/ebcfinance/editingexpense/${id}`);
    } else if (singleIncome?.main === "Income") {
      navigate(`/ebcfinance/editingincome/${id}`);
    }
  };
  const handleBackAfterEditing = () => {
    if (singleIncome?.main === "Expenses") {
      navigate(`/ebcfinance/views/expenses`);
    } else if (singleIncome?.main === "Income") {
      navigate(`/ebcfinance/views/income`);
    }
  };
  console.log(singleIncome);
  return (
    <main className="single-income">
      {loading && (
        <section className="del-loading-cx">
          <div className="del-loading">
            <h2>Delecting {SingleIncome?.main}</h2>
          </div>
        </section>
      )}

      <section className="single-income-section-one">
        <div className="single-income-cancel-edit-del-btn-cx">
          <div className="single-income-cancel-btn-cx">
            <button onClick={() => handleBackAfterEditing()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#white"
              >
                <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" />
              </svg>
            </button>
          </div>
          {loginUserDetail?.role === "admin" && (
            <div className="single-income-edit-del-btn-cx">
              <button
                className="single-income-edit-btn"
                onClick={() => {
                  // navigate(`/ebcfinance/editingincome/${id}`);
                  handleEditingNavigation(id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="#000000"
                  style={{ fill: `` }}
                >
                  <path d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z" />
                </svg>
              </button>
              <button
                className="single-income-del-btn"
                onClick={() => handleDelete(singleIncome.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="red"
                >
                  <path d="m366-299.33 114-115.34 114.67 115.34 50-50.67-114-115.33 114-115.34-50-50.66L480-516 366-631.33l-50.67 50.66L430-465.33 315.33-350 366-299.33ZM267.33-120q-27 0-46.83-19.83-19.83-19.84-19.83-46.84V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-425.34 0v553.33V-740Z" />
                </svg>
              </button>
            </div>
          )}
        </div>
        <hr />
        <div className="single-income-title">
          <h1> {singleIncome?.main}</h1>
        </div>
      </section>
      <section className="single-income-section-two">
        <div className="single-income-amount">
          <h2> Amount</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg
              fill="#ffffff"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              // xmlns:xlink="http://www.w3.org/1999/xlink"
              width="41px"
              height="59px"
              viewBox="0 0 496.262 496.262"
              // xml:space="preserve"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="1" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="square"
                stroke-linejoin="square"
              />
              <path d="M477.832,274.28h-67.743v-65.106h67.743c10.179,0,18.43-8.243,18.43-18.424c0-10.182-8.251-18.43-18.43-18.43h-67.743 V81.982c0-13.187-2.606-22.866-7.743-28.762c-4.882-5.609-11.301-8.219-20.19-8.219c-8.482,0-14.659,2.592-19.447,8.166 c-5.077,5.902-7.654,15.599-7.654,28.821v90.343H227.627l-54.181-81.988c-4.637-7.317-8.997-14.171-13.231-20.75 c-3.812-5.925-7.53-10.749-11.042-14.351c-3.109-3.189-6.652-5.657-10.796-7.554c-3.91-1.785-8.881-2.681-14.762-2.681 c-7.501,0-14.31,2.055-20.83,6.277c-6.452,4.176-10.912,9.339-13.636,15.785c-2.391,6.126-3.656,15.513-3.656,27.63v77.626h-67.07 C8.246,172.326,0,180.574,0,190.755c0,10.181,8.246,18.424,18.424,18.424h67.07v65.113h-67.07C8.246,274.292,0,282.538,0,292.722 C0,302.9,8.246,311.14,18.424,311.14h67.07v103.143c0,12.797,2.689,22.378,8.015,28.466c5.065,5.805,11.487,8.5,20.208,8.5 c8.414,0,14.786-2.707,20.07-8.523c5.411-5.958,8.148-15.533,8.148-28.442V311.14h115.308l62.399,95.683 c4.339,6.325,8.819,12.709,13.287,18.969c4.031,5.621,8.429,10.574,13.069,14.711c4.179,3.742,8.659,6.484,13.316,8.157 c4.794,1.726,10.397,2.601,16.615,2.601c16.875,0,34.158-5.166,34.158-43.479V311.14h67.743c10.179,0,18.43-8.252,18.43-18.43 C496.262,282.532,488.011,274.28,477.832,274.28z M355.054,209.173v65.106h-60.041l-43.021-65.106H355.054z M141.936,134.364 l24.76,37.956h-24.76V134.364z M141.936,274.28v-65.106h48.802l42.466,65.106H141.936z M355.054,365.153l-35.683-54.013h35.683 V365.153z" />{" "}
            </svg>
            <h1>{singleIncome?.amount}</h1>
          </div>
        </div>

        <div className="single-income-desc-cx">
          <h1
            style={{
              color: "red",
              borderBottom: "solid",
              marginBottom: "10px",
            }}
          >
            Details
          </h1>
          <div className="single-income-desc">
            <h3>Reference No.:</h3>
            <h2>{singleIncome?.id}</h2>
          </div>
          <hr />
          <div>
            <h3>Date:</h3>
            <h2>{singleIncome?.date}</h2>
          </div>
          <hr />

          {singleIncome?.incomeSource && (
            <div>
              <h3>Income From: </h3>
              <h2>{singleIncome?.incomeSource}</h2>
              <hr />
            </div>
          )}

          {singleIncome?.expensesCategory && (
            <div>
              <h3>Given to: </h3>
              <h2>{singleIncome?.expensesCategory}</h2>
              <hr />
            </div>
          )}

          {singleIncome?.MOD && (
            <div>
              <h3>Means of Funding: </h3>
              <h2>{singleIncome?.MOD}</h2>
              <hr />
            </div>
          )}

          {singleIncome?.desc && (
            <div>
              <h3>Description: </h3>
              <h2>{singleIncome?.desc}</h2>
              <hr />
            </div>
          )}

          {singleIncome?.givenBy && (
            <div>
              <h3>Given By: </h3>
              <h2>{singleIncome?.givenBy}</h2>
              <hr />
            </div>
          )}

          {singleIncome?.createdBy && (
            <div>
              <h3>Transaction Initiated By: </h3>
              <h2>{singleIncome?.createdBy}</h2>
              <hr />
            </div>
          )}
        </div>
      </section>
      <section
        style={{
          display: "flex",
          placeContent: "center",
          paddingBottom: "20px",
        }}
      >
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#white"
          >
            <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" />
          </svg>
        </button>
      </section>
    </main>
  );
}

import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  setDoc,
  Timestamp,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { formatedNumber } from "./FormatedNumber";
function AddExpenses() {
  const [form, setForm] = useState({
    amount: "",
    date: new Date(Date.now()).toISOString().split("T")[0],
    desc: "",
    MOD: "",
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    givenBy: "",
    expensesCategory: "",
    main: "Expenses",
    month: new Date(Date.now()).toLocaleDateString("en-US", { month: "long" }),
    // MOD="Means of Disbursement"
  });
  const [amountErrors, setAmountErrors] = useState("");
  const [dateErrors, setDateErrors] = useState("");
  const [descErrors, setDescErrors] = useState("");
  const [typeErrors, setTypeErrors] = useState("");
  const [categoryErrors, setCategoryErrors] = useState("");
  const [monthName, setMonthName] = useState("");
  const [_date, set_Date] = useState("");
  const [color, setColor] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [expense, setExpense] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState();
  const [singleExpenses, setSingleExpenses] = useState({});
  const [givenByError, setGivenByError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  let date2 = new Date(Date.now());

 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "MOD") {
      setTypeErrors("");
    }
    if (e.target.name === "date") {
      setDateErrors("");
    }
    if (e.target.name === "desc") {
      setDescErrors("");
    }
    if (e.target.name === "expensesCategory") {
      setCategoryErrors("");
    }
    if (e.target.name === "givenBy") {
      setGivenByError("");
    }

    if (e.target.name === "date") {
      console.log("changing date");
      setForm({
        ...form,
        date: e.target.value,
        month: new Date(form.date).toLocaleDateString("en-US", {
          month: "long",
        }),
      });
    }


  };

  useEffect(() => {
    set_Date(new Date(Date.now()).toISOString().split("T")[0]);
    // setColor("#" + Math.floor(Math.random() * 16777215).toString(16));
    const storedUser =
      JSON.parse(localStorage.getItem("ebcfinance-user")) || null;

    setUser(storedUser);
  }, [id]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    // Update state with retrieved values
    setExpense(storedExpenses);

    const totalExpenses = storedExpenses.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );

    setTotalExpenses(totalExpenses);

    // setTotalExpenses(totalExpenses);
  }, []);

  useEffect(() => {
    const filterTasksById = (id) => {
      return expense?.find((task) => task?.id.trim() === id?.trim());
    };
    setSingleExpenses(filterTasksById(id));
    if (id) {
      setForm({
        ...form,
        amount: singleExpenses?.amount,
        date: singleExpenses?.date,
        MOD: singleExpenses?.MOD,
        desc: singleExpenses?.desc,
        givenBy: singleExpenses?.givenBy,
        expensesCategory: singleExpenses?.expensesCategory,
      });
    }
  }, [id, expense, singleExpenses]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log(form)
    const updatedForm = {
      ...form,
    };

  

    if (form.amount === "") {
      setAmountErrors("Please enter a valid amount");
      return
    }
    if (form.MOD === "") {
      setTypeErrors("Please enter a valid MOF");
      return
    }
    if (form.desc === "") {
      setDescErrors("Please enter a valid description");
      return
    }
    if (form.expensesCategory === "") {
      setCategoryErrors("Please select a department");
      return
    }
    if (form.givenBy === "") {
      setGivenByError("Please enter a giver name");
      return
    }
    // if (form.date === "") {
    //   setDateErrors("Please enter a date");
    //   return
    // }
    // if (
    //   form.amount === "" ||
    //   form.MOD === "" ||
    //   form.desc === "" ||
    //   form.date === "" ||
    //   form.expensesCategory === "" ||
    //   form.givenBy
    // ) {
    //   return;
    // }

    if (!user) {
      navigate("/ebcfinance-login");
    } else if (id) {
      setLoading(true);
      console.log("updating");
      await updateDoc(doc(db, "Expenses", id.trim()), {
        amount: parseInt(form.amount),
        date: form.date,
        MOD: form.MOD,
        desc: form.desc,
        givenBy: form.givenBy,
        expensesCategory: form.expensesCategory,
      }).then(() => {
        console.log("updated successfully");
        navigate(`/ebcfinance/expense/${id}`);
      });
    } else {
      setLoading(true);
      console.log("sending");
      const blogRef = doc(collection(db, "Expenses"));

      await setDoc(blogRef, {
        createdAt: Timestamp.now().toDate(),
        createdBy: user?.displayName,
        userId: user?.uid,
        amount: parseInt(form.amount),
        date: form.date,
        desc: form.desc,
        MOD: form.MOD,
        color: form.color,
        givenBy: form.givenBy,
        expensesCategory: form.expensesCategory,
        main: "Expenses",
        month: form.month,
      });
    }
    setLoading(false);
    console.log(form);
    // fetchExpenses();
    setForm({
      ...form,
      expensesCategory: "",
      amount: "",
      date: new Date(Date.now()).toISOString().split("T")[0],
      desc: "",
      givenBy: "",
      // color: "",
      MOD: "",
      month: new Date(Date.now()).toLocaleDateString("en-US", { month: "long" }),
    });
  };

  const fetchExpenses = function () {
    console.log("expenses fetched");
    try {
      const expenseRef = collection(db, "Expenses");
      const q = query(
        expenseRef,
        orderBy("date", "desc")
        // where("status", "==", "published")
      );
      onSnapshot(q, (snapshot) => {
        const expenses = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        setExpense(expenses);
        localStorage.setItem("expenses", JSON.stringify(expenses));
      });
    } catch (error) {
      setError(error);
    }
  };
  // console.log(user);
  // console.log(error);
  // console.log(id);

  return (
    <main className="addexpenses">
      <section>
        {id && (
          <section className="editing-section-one">
            <div className="editing-title-del-cx">
              <div className="editing-title">
                <h1>Editing {singleExpenses?.main}</h1>
                <h4>{id}</h4>
              </div>

              <button onClick={() => navigate(`/ebcfinance/expense/${id}`)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="#000000"
                >
                  <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z" />
                </svg>
              </button>
            </div>
          </section>
        )}
      </section>
      <section>
        <form className="input-div-cx">
          <div className="input-cx income-amount-cx">
            <label htmlFor="amount">Amount</label>
            <div className="amount-naira-cx">
              <h1>
                <svg
                  fill="#ffffff"
                  version="1.1"
                  id="Capa_1"
                  style={{ fill: "white" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  height="50px"
                  viewBox="0 0 496.262 496.262"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="1" />
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="square"
                    stroke-linejoin="square"
                  />
                  <path d="M477.832,274.28h-67.743v-65.106h67.743c10.179,0,18.43-8.243,18.43-18.424c0-10.182-8.251-18.43-18.43-18.43h-67.743 V81.982c0-13.187-2.606-22.866-7.743-28.762c-4.882-5.609-11.301-8.219-20.19-8.219c-8.482,0-14.659,2.592-19.447,8.166 c-5.077,5.902-7.654,15.599-7.654,28.821v90.343H227.627l-54.181-81.988c-4.637-7.317-8.997-14.171-13.231-20.75 c-3.812-5.925-7.53-10.749-11.042-14.351c-3.109-3.189-6.652-5.657-10.796-7.554c-3.91-1.785-8.881-2.681-14.762-2.681 c-7.501,0-14.31,2.055-20.83,6.277c-6.452,4.176-10.912,9.339-13.636,15.785c-2.391,6.126-3.656,15.513-3.656,27.63v77.626h-67.07 C8.246,172.326,0,180.574,0,190.755c0,10.181,8.246,18.424,18.424,18.424h67.07v65.113h-67.07C8.246,274.292,0,282.538,0,292.722 C0,302.9,8.246,311.14,18.424,311.14h67.07v103.143c0,12.797,2.689,22.378,8.015,28.466c5.065,5.805,11.487,8.5,20.208,8.5 c8.414,0,14.786-2.707,20.07-8.523c5.411-5.958,8.148-15.533,8.148-28.442V311.14h115.308l62.399,95.683 c4.339,6.325,8.819,12.709,13.287,18.969c4.031,5.621,8.429,10.574,13.069,14.711c4.179,3.742,8.659,6.484,13.316,8.157 c4.794,1.726,10.397,2.601,16.615,2.601c16.875,0,34.158-5.166,34.158-43.479V311.14h67.743c10.179,0,18.43-8.252,18.43-18.43 C496.262,282.532,488.011,274.28,477.832,274.28z M355.054,209.173v65.106h-60.041l-43.021-65.106H355.054z M141.936,134.364 l24.76,37.956h-24.76V134.364z M141.936,274.28v-65.106h48.802l42.466,65.106H141.936z M355.054,365.153l-35.683-54.013h35.683 V365.153z" />{" "}
                </svg>
              </h1>
              <input
                type="number"
                name="amount"
                id="income"
                required
                placeholder="123 456 678"
                value={form.amount}
                onInput={() => {
                  setAmountErrors("");
                }}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <p className="error">{amountErrors}</p>
          </div>

          <div className="date-mod-cx">
            <div className="input-cx expense-date-cx">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                className="expense-date"
                onChange={(e) => handleChange(e)}
                // value={date2.toISOString().split("T")[0]}
                value={form.date || date2.toISOString().split("T")[0]}
              />
              <p className="error">{dateErrors}</p>
            </div>
            <div className="input-cx mod-cx">
              <label htmlFor="income-type" style={{ color: "black" }}>
                {/* Means of Disbursement */}
                Means of Funding
              </label>
              <select
                name="MOD"
                className="mod-input"
                id="mod-input"
                required
                value={form.MOD}
                onChange={(e) => handleChange(e)}
              >
                <option value="" selected>
                  Please Select a MOF
                </option>
                <option value="Via Bank" selected>
                  Via Bank
                </option>
                <option value="By Cash">By Cash</option>
              </select>
              <p className="error">{typeErrors}</p>
            </div>
          </div>

          <div className="input-cx custom-select">
            <label htmlFor="income-type" style={{ color: "black" }}>
              Department
            </label>
            <select
              name="expensesCategory"
              className="expense-category"
              required
              value={form.expensesCategory}
              onChange={(e) => handleChange(e)}
            >
              <option className="option">
                Please Select a Department
              </option>
              <optgroup label="Department">
                <option className="option" value="Building Committee" selected>
                  Building Committee
                </option>
                <option className="option" value="Counter Committee" selected>
                  Counter Committee
                </option>
                <option className="option" value="Decoration Committee">
                  Decoration Committee
                </option>
                <option className="option" value="Electrical Department">
                  Electrical Department
                </option>
                <option
                  className="option"
                  value="Finance/Stewardship Committee"
                >
                  Finance/Stewardship Committee
                </option>
                <option className="option" value="Generator Department">
                  Generator Department
                </option>
                <option className="option" value="Health Department">
                  Health Department
                </option>
                <option className="option" value="Media Department">
                  Media Department
                </option>
                <option className="option" value="Music Department">
                  Music Department
                </option>
                <option className="option" value="Publicity Committee">
                  Publicity Committee
                </option>
                <option className="option" value="Transport Committee">
                  Transport Committee
                </option>
                <option className="option" value="Sanitation Committee">
                  Sanitation Committee
                </option>
                <option className="option" value="Sound Department">
                  Sound Department
                </option>
                <option className="option" value=" Social/Warfare Committee">
                  Social/Warfare Committee
                </option>
                <option className="option" value="Salary Payment">
                  Salary Payment
                </option>
                <option className="option" value="Allocation">
                  Allocation
                </option>
                <option className="option" value="Cooperative Payment">
                 Cooperative Payment
                </option>
              </optgroup>
              <optgroup label="Dues">
                <option className="option" value="Associational Dues">
                  Associational Dues
                </option>
                <option className="option" value="Conference Dues">
                  Conference Dues
                </option>
                <option className="option" value="Convention Dues">
                  Convention Dues
                </option>
              </optgroup>
              <option className="option" value="Others">
                 Others
                </option>
            </select>
            <p className="error">{categoryErrors}</p>
          </div>

          <div className="input-cx income-desc-cx">
            <label htmlFor="desc">Description/Naration</label>
            <textarea
              name="desc"
              value={form.desc}
              onChange={(e) => handleChange(e)}
            ></textarea>
            <p className="error">{descErrors}</p>
          </div>

          <div className="input-cx income-desc-cx">
            <label htmlFor="givenBy">Given By</label>
            <input
              type="text"
              name="givenBy"
              placeholder="Enter the giver's name"
              value={form.givenBy}
              onChange={(e) => handleChange(e)}
            />
            <p className="error">{givenByError}</p>
          </div>

          <section className="trx-save-btn-cx">
            <button
              className="add-btn"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              {loading ? "Adding Expenses" : "Save"}
            </button>
            {loading && (
              <div className="trx-loading">
                <span></span>
              </div>
            )}
          </section>

          {/* {loading && <h3> adding expenses...</h3>}
          <button
            className="add-btn"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Save
          </button> */}
        </form>
      </section>
    </main>
  );
}

export default AddExpenses;

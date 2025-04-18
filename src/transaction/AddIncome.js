import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
import "./transactionstyle/transactionstyles.css";
import Confirmation from "./confirmation";
function AddIncome() {
  const [form, setForm] = useState({
    main: "Income",
    amount: "",
    date: new Date(Date.now()).toISOString().split("T")[0],
    desc: "",
    income_source: "",
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    month: new Date(Date.now()).toLocaleDateString("en-US", { month: "long" }),
  });
  const { id } = useParams();
  const [amountErrors, setAmountErrors] = useState("");
  const [sourceErrors, setSourceErrors] = useState("");
  const [typeErrors, setTypeErrors] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [_date, set_Date] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState();
  const [singleIncome, setSingleIncome] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
 
 const[formatedNumber,setFormartedNumber]=useState()
  const navigate = useNavigate();

  const formatNumber = (values) => {
    return values.replace(/\D/g, "") // Remove non-digit characters
    .replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Add spaces every 3 digits




    // return value.replace(/\D/g, "") // Remove non-digit characters
                // .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "); // Add spaces every 3 digits
  };


  const CheckForLetters = (str)=>{
    
    return /[a-z]/i.test(str);

}

  let date2 = new Date(Date.now());
  // console.log(date2.toDateString());
  const handleChange = (e) => {
//  if (e.target.name === "amount") {
//       setFormartedNumber(formatNumber(e.target.value))
//       if (CheckForLetters(e.target.value)){
//         return
//       }
//       console.log("changing date");
    
//     }


    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "amount") {
      setAmountErrors("");
    }
    if (e.target.name === "income_source") {
      setTypeErrors("");
    }
    if (e.target.name === "income_type") {
      setSourceErrors("");
    }

    // if (e.target.name === "amount") {
    //   setFormartedNumber(formatNumber(e.target.value))
    //   if (CheckForLetters(e.target.value)){
    //     return
    //   }
    //   console.log("changing date");
    
    // }
  };
  // console.log(parseInt(formatedNumber?.replace(/,/g,''),10)+4)
  

  const handleShowConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

// useEffect(()=>{},[])

  useEffect(() => {
    set_Date(new Date(Date.now()).toISOString().split("T")[0]);
    setUser(JSON.parse(localStorage.getItem("ebcfinance-user")));
  }, [id]);

  useEffect(() => {
    const storedIncome = JSON.parse(localStorage.getItem("incomes")) || [];
    // Update state with retrieved values
    setIncomes(storedIncome);

    const totalIncome = storedIncome.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );

    setTotalIncome(totalIncome);

    // setTotalExpenses(totalExpenses);
  }, []);

  useEffect(() => {
    const filterTasksById = (id) => {
      return incomes?.find((task) => task?.id.trim() === id?.trim());
    };
    setSingleIncome(filterTasksById(id));
    if (id) {
      setForm({
        ...form,
        amount: singleIncome?.amount,
        date: singleIncome?.date,
        income_source: singleIncome?.incomeSource,
        desc: singleIncome?.desc,
      });
    }
  }, [id, incomes, singleIncome]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedForm = {
      ...form,
    };

    
    
    console.log(form);
    if (form.amount === "") {
      setAmountErrors("Please enter a valid amount");
      return;
    }
    if (form.income_source === "") {
      setSourceErrors("Please enter a valid source");
      return;
    }

    if (!user) {
      navigate("/ebcfinance-login");
    } else if (id) {
      setLoading(true);
      console.log("updating");
      await updateDoc(doc(db, "Income", id.trim()), {
        amount: parseInt(form.amount),
        date: form.date,
        desc: form.desc,
        incomeSource: form.income_source,
      }).then(() => {
        console.log("updated successfully");
        navigate(`/ebcfinance/income/${id}`);
      });
    } else {
      setLoading(true);
      console.log("sending");
      const incomeRef = doc(collection(db, "Income"));

      await setDoc(incomeRef, {
        createdAt: Timestamp.now().toDate(),
        createdBy: user?.displayName,
        userId: user?.uid,
        amount: parseInt(form.amount),
        date: form.date,
        desc: form.desc,
        color: form.color,
        main: "Income",
        month: form.month,
        incomeSource: form.income_source,
      });
    }
    // console.log(form);
    setLoading(false);
    handleShowConfirmation();
    setForm({
      ...form,
      amount: "",
      date: new Date(Date.now()).toISOString().split("T")[0],
      desc: "",
      // color: "",
      month: new Date(Date.now()).toLocaleDateString("en-US", { month: "long" }),
      income_source: "",
    });
  };

  // console.log(showConfirmation);
  return (
    <main className="addincome">
      <section>
        {id && (
          <section className="editing-section-one">
            <div className="editing-title-del-cx">
              <div className="editing-title">
                <h1>Editing {singleIncome?.main}</h1>
                <h4>{id}</h4>
              </div>

              <button onClick={() => navigate(-1)}>
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
      {/* <section className="confirmation-cx">
      <Confirmation/>
      </section>
      */}

      {showConfirmation && (
        <section className="confirmation-cx">
          <Confirmation handleShowConfirmation={handleShowConfirmation} />
        </section>
      )}
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
              style={{border:'none',outline:'none'}}
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
          <div className="input-cx income-date-cx">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              className="transaction-date"
              onChange={(e) => handleChange(e)}
              // value={date2.toISOString().split("T")[0]}
              value={form.date || date2.toISOString().split("T")[0]}
            />
          </div>

          <div className="input-cx income-type-cx">
            <label htmlFor="income-source" style={{ color: "black" }}>
              Income Source
            </label>
            <select
              name="income_source"
              className="income-source"
              id="income-source"
              required
              value={form.income_source}
              onChange={(e) => handleChange(e)}
            >
              <option className="option">Please Select Income Source</option>
              <option className="option" value="Balance b/f" selected>
                Balance b/f
              </option>
              <option className="option" value="Main Offfering" selected>
                Main Offering/Tithes
              </option>
              <option className="option" value="Rent">
                Rent
              </option>
              <option className="option" value="Tithes">
                Tithes
              </option>
              <option className="option" value="Mission Offering">
                Mission Offering
              </option>
              <option className="option" value="Building Offering">
                Building Offering
              </option>
              <option className="option" value="Sunday School Offering">
                Sunday School Offering
              </option>
              <option className="option" value="Discples's Lifestyle Offering">
                Disciple's Lifestyle Offering
              </option>
              <option className="option" value="Charity Offering">
                Charity Offering
              </option>
              <option className="option" value="Seed Offering">
                Seed Offering
              </option>
              <option className="option" value="Special Offering">
                Special Offering
              </option>
              <option className="option" value="Others Offering">
                Others Offering
              </option>
            </select>
            <p className="error">{sourceErrors}</p>
          </div>

          {/* <div className="input-cx income-type-cx">
            <label htmlFor="income-type" style={{ color: "black" }}>
              Income Type
            </label>
            <select
              name="income_type"
              className="income-type"
              id="income-type"
              required
              value={form.income_type}
              onChange={(e) => handleChange(e)}
            >
              <option value="" selected>
                Please Select Income type
              </option>
              <option value="Cash" selected>
                Cash
              </option>
              <option value="Bank">Bank</option>
            </select>
            <p className="error">{sourceErrors}</p>
          </div> */}

          <hr />
          <div className="input-cx income-desc-cx">
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              value={form.desc}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <hr />

          <section className="trx-save-btn-cx">
            <button
              className="add-btn"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              {loading ? "Saving" : "Save"}
            </button>
            {loading && (
              <div className="trx-loading">
                <span></span>
              </div>
            )}
          </section>
        </form>
      </section>
    </main>
  );
}

export default AddIncome;

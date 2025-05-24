import React, { useState, useEffect } from "react";
// import PdfGenerator from "../pdf/PdfGenerator";
import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import "./reportstyle/reportstyles.css";
import { useNavigate } from "react-router-dom";
import MyDocument from "../pdf/MyDocument";
import { ListOfMonths } from "../ListOfMonths";
// import PdfGenerator2 from "../pdf/PdfGenerator2";

export default function Report() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState();
  const [totalExpenses, setTotalExpenses] = useState();
  const [totalBalance, setTotalBalance] = useState();
  const [loginUserDetail, setLoginUserDetail] = useState();
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState("");
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    desc: "Monthly Financial Report Presented to the Executive Members of Ebenezer Baptist Church, Enerhen",
    month: "",
    name: "",
    //  new Date(Date.now()).toLocaleDateString("en-US", { month: "long" }),
  });
  const [incomeByMonth, setIncomeByMonth] = useState([]);
  const [expensesByMonth, setExpensesByMonth] = useState([]);
  const [electricalExpenses, setElectricalExpenses] = useState([]);
  const [soundExpenses, setSoundExpenses] = useState([]);
  const [buildingExpenses, setBuildingExpenses] = useState([]);
  const [counterExpenses, setCounterExpenses] = useState([]);
  const [mediaExpenses, setMediaExpenses] = useState([]);
  const [publicityExpenses, setPublicityExpenses] = useState([]);
  const [musicExpenses, setMusicExpenses] = useState([]);
  const [transportExpenses, setTransportExpenses] = useState([]);
  const [sanitationExpenses, setSanitationExpenses] = useState([]);
  const [salary, setSalary] = useState([]);
  const [cooperative, setCooperative] = useState([]);
  const [generatorExpenses, setGeneratorExpenses] = useState([]);

  const [assocationalDues, setAssocationalDues] = useState([]);
  const [conferenceDues, setConferenceDues] = useState([]);
  const [conventionDues, setConventionDues] = useState([]);
  const [otherExpenses, setOtherExpenses] = useState([]);
  const [finance_stewardships, setFinance_stewardships] = useState([]);
  const [social_warfare, setSocial_warfare] = useState([]);
  const [decorationExpenses, setDecorationExpenses] = useState([]);
  const [healthExpenses, setHealthExpenses] = useState([]);
  const [departmentExpenses, setDepartmentExpenses] = useState([]);
  const [totalIncomeAmountThisMonth, setTotalIncomeAmountThisMonth] =
    useState();
  const [totalExpensesAmountThisMonth, setTotalExpensesAmountThisMonth] =
    useState();
  const [monthError, setMonthError] = useState("");
  const [nameError, setNameError] = useState("");
  const [display, setDisplay] = useState("hide");
  const [allocation, setAllocation] = useState([]);
  const navigate = useNavigate();
  const [numberItems, setNumberItems] = useState(0);
  const [chunks, setChunks] = useState([]);
  const [cummulativeExpenses, setCummulativeExpenses] = useState([]);
  const [cummulativeExpensesAmount, setCummulativeExpenseAmount] = useState(0);
  const [cummulativeIncomes, setCummulativeIncomes] = useState([]);
  const [cummulativeIncomesAmount, setCummulativeIncomesAmount] = useState(0);

  const balancebf = 1219033.01;

  let allExpenses = [];
  const handleSetForm = (e) => {
    // e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "month") {
      setMonthError("");
    }
    if (e.target.name === "name") {
      setNameError("");
    }
  };

  const cummulativeMonth = (month) => {
    const monthArr = ListOfMonths().slice(1);
    const monthIndex = monthArr.indexOf(month);
    const cummulativeMonths = [];
    for (let i = 0; i <= monthIndex; i++) {
      cummulativeMonths.push(monthArr[i]);
    }
    return cummulativeMonths;
  };

 

  // console.log(cummulativeMonth(form.month));

  useEffect(() => {
    const storedIncome = JSON.parse(localStorage.getItem("incomes")) || [];
    const storedExpense = JSON.parse(localStorage.getItem("expenses")) || [];
    const storedUser =
      JSON.parse(localStorage.getItem("ebcfinance-user")) || null;

    setIncomes(storedIncome);
    setExpenses(storedExpense);
    setUser(storedUser);

    const thisMonthIncome = incomes.filter(function (item) {
      const date = new Date(item.date);
      const month = date.toLocaleDateString("en-US", {
        month: "long",
      });

      return month === form.month;
    });

    setIncomeByMonth(thisMonthIncome);

    const thisMonthExpenses = expenses?.filter(function (item) {
      const date = new Date(item.date);
      const month = date.toLocaleDateString("en-US", {
        month: "long",
      });

      return month === form.month;
    });
    setExpensesByMonth(thisMonthExpenses);

    // cummulated Incoomes and expenses/////////////////////////////////////////////////////////

   
    const cummulatedIncomes = incomes?.filter(function (item) {
      const date = new Date(item.date);
      const month = date.toLocaleDateString("en-US", {
        month: "long",
      });

      return cummulativeMonth(form.month).includes(month);
    });
    setCummulativeIncomes(cummulatedIncomes);
   
    const cummulatedExpenses = expenses?.filter(function (item) {
      const date = new Date(item.date);
      const month = date.toLocaleDateString("en-US", {
        month: "long",
      });

      return cummulativeMonth(form.month).includes(month);
    });
    setCummulativeExpenses(cummulatedExpenses);

// Cummulated amounts ==========================================================
     const _cummulatedIncomeAmount = cummulatedIncomes.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );

    setCummulativeIncomesAmount(_cummulatedIncomeAmount)


    const _cummulatedExpensesAmount = cummulatedExpenses.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );

    setCummulativeExpenseAmount(_cummulatedExpensesAmount)



    const totalExpenses = storedExpense.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );
    const totalIncomes = storedIncome.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );

    const addThisMonthIncome = thisMonthIncome.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );
    setTotalIncomeAmountThisMonth(addThisMonthIncome);

    const addThisMonthExpenses = thisMonthExpenses.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );
    setTotalExpensesAmountThisMonth(addThisMonthExpenses);

    setTotalIncome(totalIncomes);

    setTotalExpenses(totalExpenses);

    console.log(cummulativeExpensesAmount)

    setTotalBalance(cummulativeIncomesAmount - cummulativeExpensesAmount)
    // setTotalBalance((cummulativeIncomesAmount - cummulativeExpensesAmount));
    setForm({ ...form, name: user?.displayName });
  }, [form.month]);

  // console.log(cummulativeIncomesAmount);
  // console.log(cummulativeIncomesAmount - cummulativeExpensesAmount)


  const handlePreviewReport = () => {
    if (form.month === "") {
      setMonthError("Please select month");

      return;
    }

    if (form.name === "") {
      setForm({ ...form, name: user?.displayName });
    }

    const filterExpensesByName = (name) =>
      expensesByMonth?.filter((item) => item?.expensesCategory === name);

    setElectricalExpenses(filterExpensesByName("Electrical Department"));
    setBuildingExpenses(filterExpensesByName("Building Committee")); //
    setCounterExpenses(filterExpensesByName("Counter Committee")); //
    setMediaExpenses(filterExpensesByName("Media Department")); //
    setPublicityExpenses(filterExpensesByName("Publicity Committee")); //
    setMusicExpenses(filterExpensesByName("Music Department")); //
    setTransportExpenses(filterExpensesByName("Transport Committee")); //
    setSanitationExpenses(filterExpensesByName("Sanitation Committee")); //
    setSoundExpenses(filterExpensesByName("Sound Department")); //
    setHealthExpenses(filterExpensesByName("Health Department")); //
    setFinance_stewardships(
      filterExpensesByName("Finance/Stewardship Committee")
    ); //
    setSocial_warfare(filterExpensesByName(" Social/Warfare Committee")); //
    setAssocationalDues(filterExpensesByName("Associational Dues"));
    setDecorationExpenses(filterExpensesByName("Decoration Committee")); //
    setGeneratorExpenses(filterExpensesByName("Generator Department")); //
    setSalary(filterExpensesByName("Salary Payment")); //
    setCooperative(filterExpensesByName("Cooperative Payment"));
    setOtherExpenses(filterExpensesByName("Others"));
    setConferenceDues(filterExpensesByName("Conference Dues"));
    setConventionDues(filterExpensesByName("Convention Dues"));
    setAllocation(filterExpensesByName("Allocation"));

    if (display === "hide") {
      setDisplay("show");
    } else {
      setDisplay("hide");
    }
  };
  const handleSetDisplay = () => {
    if (display === "hide") {
      setDisplay("show");
    } else if (display === "show") {
      setDisplay("hide");
    }
  };

  useEffect(() => {
    let itemCount = 0;
    allExpenses.push({
      presentedBy: form.name,
      heading: form.desc,
      month: form.month,
      items: [],
    });

    if (incomeByMonth.length > 0) {
      allExpenses.push({ heading: "", name: "Income", items: incomeByMonth });
      itemCount += incomeByMonth.length;
    }

    // console.log(mediaExpenses);
    if (electricalExpenses.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Electrical Expenses",
        items: electricalExpenses,
      });
      itemCount += electricalExpenses.length;
    }

    if (transportExpenses.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Transportation Expenses",
        items: transportExpenses,
      });
      itemCount += transportExpenses.length;
    }

    if (mediaExpenses.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Media Expenses",
        items: mediaExpenses,
      });
      itemCount += mediaExpenses.length;
    }
    if (soundExpenses.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Sound Expenses",
        items: soundExpenses,
      });
      itemCount += soundExpenses.length;
    }
    if (counterExpenses.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Counter Expenses",
        items: counterExpenses,
      });
      itemCount += counterExpenses.length;
    }
    if (finance_stewardships.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Finance/Stewardship Expenses",
        items: finance_stewardships,
      });
      itemCount += finance_stewardships.length;
    }
    if (healthExpenses.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Health Expenses",
        items: healthExpenses,
      });
      itemCount += healthExpenses.length;
    }
    if (buildingExpenses.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Building Expenses",
        items: buildingExpenses,
      });
      itemCount += buildingExpenses.length;
    }
    if (publicityExpenses.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Publicity Expenses",
        items: publicityExpenses,
      });
      itemCount += publicityExpenses.length;
    }
    if (assocationalDues.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Associational Dues Paid",
        items: assocationalDues,
      });
      itemCount += assocationalDues.length;
    }
    if (conferenceDues.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Conference Dues Paid",
        items: conferenceDues,
      });
      itemCount += conferenceDues.length;
    }
    if (conventionDues.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "convention Dues Paid",
        items: conventionDues,
      });
      itemCount += conventionDues.length;
    }
    if (salary.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Salaries Payments",
        items: salary,
      });
      itemCount += salary.length;
    }
    if (cooperative.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Cooperative Payment",
        items: cooperative,
      });
      itemCount += cooperative.length;
    }
    if (allocation.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Allocations",
        items: allocation,
      });
      itemCount += allocation.length;
    }
    if (decorationExpenses.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Decoration Expenses",
        items: decorationExpenses,
      });
      itemCount += decorationExpenses.length;
    }
    if (generatorExpenses.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Generator Expenses",
        items: generatorExpenses,
      });
      itemCount += generatorExpenses.length;
    }
    if (decorationExpenses.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Decoration Expenses",
        items: decorationExpenses,
      });
      itemCount += decorationExpenses.length;
    }
    if (musicExpenses.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Music Expenses",
        items: musicExpenses,
      });
      itemCount += musicExpenses.length;
    }
    if (social_warfare.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Social/Warfare Expenses",
        items: social_warfare,
      });
      itemCount += social_warfare.length;
    }
    if (otherExpenses.length !== 0) {
      allExpenses.push({
        heading: "",
        name: "Other Expenses",
        items: otherExpenses,
      });
      itemCount += otherExpenses.length;
    }

    allExpenses.push({
      name: "This Month Summary",
      items: [
        { desc: "Monthly Income", amount: totalIncomeAmountThisMonth },
        { desc: "Monthly Expenses", amount: totalExpensesAmountThisMonth },
        {
          desc: "Monthly Balance",
          amount: totalIncomeAmountThisMonth - totalExpensesAmountThisMonth,
        },
      ],
    });

    allExpenses.push({
      name: `Summary as at ${
        new Date(Date.now()).toDateString().split("T")[0]
      }`,
      items: [
        { desc: "Total Income", amount: cummulativeIncomesAmount },
        { desc: "Total Expenses", amount: cummulativeExpensesAmount },
        { desc: "Total Balance", amount: cummulativeIncomesAmount-cummulativeExpensesAmount},
      ],
    });

    allExpenses.push({
      name: "Sign",
      signedByOne: "Ojakovo Animamu",
      signedByTwo: "Prosper Sodje",
      items: [],
    });

    itemCount += 4;
    setDepartmentExpenses(allExpenses);
    setNumberItems(itemCount);
  }, [publicityExpenses]);

  useEffect(() => {
    const itemsPerPage = 5;
    const userChunks = [];
    for (let i = 0; i < numberItems; i += itemsPerPage) {
      userChunks.push(departmentExpenses.slice(i, i + itemsPerPage));
    }
    setChunks(userChunks);
  }, [departmentExpenses]);

  const handleDownload = async () => {
    let url = "";
    try {
      const blob = await pdf(
        <MyDocument
          incomes={incomeByMonth}
          form={form}
          departmentExpenses={departmentExpenses}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          totalBalance={totalBalance}
          setDisplay={setDisplay}
          handleSetDisplay={handleSetDisplay}
          numberItems={numberItems}
          chunks={chunks}
        />
      ).toBlob();
      url = URL.createObjectURL(blob);

      const response = await fetch(url);
      const blobData = await response.blob();
      const blobUrl = window.URL.createObjectURL(blobData);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `Monthly Report-${form.month}.pdf`;
      link.click();
    } catch (error) {
      console.error("Error in download process:", error);
    } finally {
      if (url) URL.revokeObjectURL(url);
    }
  };

  return (
    <main className="main-report">
      <div style={{ display: "flex", gap: "50px", padding: "5px 10px" }}>
        <span
          onClick={() => {
            navigate("/ebcfinance/views");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#white"
          >
            <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" />
          </svg>
        </span>
        <h3>Report settings</h3>
      </div>

      <form>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <label htmlFor="month">Select Month</label>

          <select
            name="month"
            onChange={(e) => handleSetForm(e)}
            value={form.month}
          >
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <p style={{ color: "red" }}>{monthError}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="name">Enter Name</label>
          <input
            type="text"
            name="name"
            placeholder="Presented by"
            value={form.name}
            onInput={(e) => {
              handleSetForm(e);
            }}
          ></input>
          <p style={{ color: "red" }}>{nameError}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="title">Enter Title</label>
          <textarea
            name="desc"
            placeholder="Enter Title"
            value={form.desc}
            onInput={(e) => {
              handleSetForm(e);
            }}
          ></textarea>
        </div>
      </form>

      <section className={`${display} pdf-preview-cx`}>
        <MyDocument
          incomes={incomeByMonth}
          form={form}
          departmentExpenses={departmentExpenses}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          totalBalance={totalBalance}
          setDisplay={setDisplay}
          handleSetDisplay={handleSetDisplay}
          numberItems={numberItems}
          chunks={chunks}
        />

        <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
          {/* <PDFDownloadLink
            className="pdf-download-btn"
            document={
              <MyDocument
                incomes={incomeByMonth}
                form={form}
                departmentExpenses={departmentExpenses}
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
                totalBalance={totalBalance}
                setDisplay={setDisplay}
                handleSetDisplay={handleSetDisplay}
                numberItems={numberItems}
                chunks={chunks}
              />
            }
            fileName={`ebc financial report ${form.month}`}
          >
            {({ blob, url, loading, error }) =>
              loading ? "loading" : "Download Pdf"
            }
          </PDFDownloadLink> */}
          <button onClick={handleDownload} className="pdf-preview-btn">
            Download pdf
          </button>
          <button
            onClick={handleSetDisplay}
            className="pdf-preview-back-btn pdf-preview-btn"
          >
            Back
          </button>
        </div>
      </section>

      <button onClick={handlePreviewReport} className="pdf-preview-btn">
        Preview
      </button>
    </main>
  );
}

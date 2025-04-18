// import React, { useRef, useState, useEffect } from "react";
// // import { jsPDF } from "jspdf";
// // import html2canvas from "html2canvas";
// import "./pdfstyle.css";
// import { useNavigate } from "react-router-dom";

// export default function PdfGenerator({
//   // Add additional state variables for other expenses here
//   incomes,
//   form,
//   expenses,
//   electricalExpenses,
//   counterExpenses,
//   buildingExpenses,
//   mediaExpenses,
//   soundExpenses,
//   transportExpenses,
//   publicityExpenses,
//   musicExpenses,
//   sanitationExpenses,
//   healthExpenses,
//   finance_stewardships,
//   decorationExpenses,
//   generatorExpenses,
//   dues,
//   departmentExpenses,
//   totalIncome,
//   totalExpenses,
//   totalBalance,
//   setDisplay,
// }) {
//   const contentRef = useRef(); // Reference for the content to be captured
//   const incomeRef = useRef(); // Reference for the income
//   const expensesPage2Ref = useRef();
//   const [pages,setPages]=useState()
//   const currentDate = new Date("01/01/2025");
//   const navigate = useNavigate();
//   let currentMonthName = currentDate.toLocaleDateString("en-US", {
//     month: "long",
//   });
//   // console.log(currentMonthName);

//   const generatePDF = async () => {
//     const content = contentRef.current;
//     const canvas = await html2canvas(content);
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4"); // Create a new A4 PDF
//     const imgWidth = 190; // Adjust for margins
//     const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

//     pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
//     pdf.save(`Ebc Financial Report for ${form.month}-- page2`); // Download the PDF
//   };

//   const generateIncomeReport = async () => {
//     const content = incomeRef.current;
//     const canvas = await html2canvas(content);
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4"); // Create a new A4 PDF
//     const imgWidth = 190; // Adjust for margins
//     const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

//     pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
//     pdf.save(`Ebc Financial Report for ${form.month} --page 1`);
//   };
//   //  console.log(incomes)

//   const generatorExpensesPage2 = async () => {
//     const content = expensesPage2Ref.current;
//     const canvas = await html2canvas(content);
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4"); // Create a new A4 PDF
//     const imgWidth = 190; // Adjust for margins
//     const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

//     pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
//     pdf.save(`Ebc Financial Report for ${form.month} --page 3`);
//   };

//   const downloadPdf = () => {
//     generatePDF();
//     generateIncomeReport();
//     generatorExpensesPage2(); // Add additional pages for other expenses here
//   };

//   console.log(departmentExpenses)
//   return (
//     <main className="document">
//       <span
//         onClick={() => {
//           setDisplay("hide");
//         }}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           height="24px"
//           viewBox="0 -960 960 960"
//           width="24px"
//           fill="#white"
//         >
//           <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" />
//         </svg>
//       </span>
//       <section
//         ref={incomeRef}
//         style={{ display: "flex", flexDirection: "column", gap: "10px" }}
//       >
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             marginBottom: "10px",
//           }}
//         >
//           <h2 className="document-title text-xl font-bold">{form.title}</h2>
//           <h2 className="document-title">Presented by {form.name}</h2>
//           <h2 className="document-title">
//             For the {form.month} {new Date(Date.now()).getFullYear()}
//           </h2>
//         </div>

//         <section className="section-cx">
//           <h2>Income</h2>
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <h3 style={{ width: "60%", color: "grey" }}>Description</h3>
//             <hr></hr>
//             <h3 style={{ color: "grey" }}>Amount (N)</h3>
//           </div>
//           <hr />
//           {incomes?.map((income) => (
//             <div key={income?.id} className="pdf-income-item">
//               <h3>{income?.incomeSource}</h3>
//               <p>{income?.amount}</p>
//             </div>
//           ))}
//         </section>
//         <div className="document-total-income">
//           <h2>Total Income:</h2>
//           <h2 className="document-total-income-amount">{totalIncome}</h2>
//         </div>
//       </section>

//       <section
//         ref={contentRef}
//         className=" main bg-white p-4 border rounded shadow-md"
//       >
//         {electricalExpenses?.length > 0 && (
       
//           <section className="section-cx">
//             <h2>Electrical Expenses</h2>
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <h3 style={{ width: "60%", color: "grey" }}>Description</h3>
//               <hr></hr>
//               <h3 style={{ color: "grey" }}>Amount (N)</h3>
//             </div>
//             <hr />
//             {electricalExpenses?.map((item) => (
//               <div key={item?.id} className="pdf-income-item">
//                 <h3>{item?.desc}</h3>
//                 <p>{item?.amount}</p>
//               </div>
//             ))}
//           </section>
//         )}

//         {/* <section className="section-cx">
//           <h2>Electrical Expenses</h2>
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <h3 style={{ width: "60%", color: "grey" }}>Description</h3>
//             <hr></hr>
//             <h3 style={{ color: "grey" }}>Amount (N)</h3>
//           </div>
//           <hr />
//           {electricalExpenses?.map((item) => (
//             <div key={item?.id} className="pdf-income-item">
//               <h3>{item?.desc}</h3>
//               <p>{item?.amount}</p>
//             </div>
//           ))}
//         </section> */}

//         {buildingExpenses.length > 0 && (
//           <section className="section-cx">
//             <h2>Building Expenses</h2>
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <h3 style={{ width: "60%", color: "grey" }}>Description</h3>
//               <hr></hr>
//               <h3 style={{ color: "grey" }}>Amount (N)</h3>
//             </div>
//             <hr />
//             {buildingExpenses?.map((item) => (
//               <div key={item?.id} className="pdf-income-item">
//                 <h3>{item?.desc}</h3>
//                 <p>{item?.amount}</p>
//               </div>
//             ))}
//           </section>
//         )}

//         {counterExpenses?.length > 0 && (
//           <section className="section-cx">
//             <h2>Media Expenses</h2>
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <h3 style={{ width: "60%", color: "grey" }}>Description</h3>
//               <hr></hr>
//               <h3 style={{ color: "grey" }}>Amount (N)</h3>
//             </div>
//             <hr />
//             {counterExpenses?.map((item) => (
//               <div key={item?.id} className="pdf-income-item">
//                 <h3>{item?.desc}</h3>
//                 <p>{item?.amount}</p>
//               </div>
//             ))}
//           </section>
//         )}
//       </section>

//       <section
//         ref={expensesPage2Ref}
//         className=" main bg-white p-4 border rounded shadow-md"
//       >
//         {mediaExpenses.length > 0 && (
//           <section className="section-cx">
//             <h2>Media Expenses</h2>
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <h3 style={{ width: "60%", color: "grey" }}>Description</h3>
//               <hr></hr>
//               <h3 style={{ color: "grey" }}>Amount (N)</h3>
//             </div>
//             <hr />
//             {mediaExpenses?.map((item) => (
//               <div key={item?.id} className="pdf-income-item">
//                 <h3>{item?.desc}</h3>
//                 <p>{item?.amount}</p>
//               </div>
//             ))}
//           </section>
//         )}

//         {soundExpenses.length > 0 && (
//           <section className="section-cx">
//             <h2>Sound Expenses</h2>
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <h3 style={{ width: "60%", color: "grey" }}>Description</h3>
//               <hr></hr>
//               <h3 style={{ color: "grey" }}>Amount (N)</h3>
//             </div>
//             <hr />
//             {soundExpenses?.map((item) => (
//               <div key={item?.id} className="pdf-income-item">
//                 <h3>{item?.desc}</h3>
//                 <p>{item?.amount}</p>
//               </div>
//             ))}
//           </section>
//         )}
//         {transportExpenses.length > 0 && (
//           <section className="section-cx">
//             <h2>Transport Expenses</h2>
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <h3 style={{ width: "60%", color: "grey" }}>Description</h3>
//               <hr></hr>
//               <h3 style={{ color: "grey" }}>Amount (N)</h3>
//             </div>
//             <hr />
//             {transportExpenses?.map((item) => (
//               <div key={item?.id} className="pdf-income-item">
//                 <h3>{item?.desc}</h3>
//                 <p>{item?.amount}</p>
//               </div>
//             ))}
//           </section>
//         )}
//         {publicityExpenses.length > 0 && (
//           <section className="section-cx">
//             <h2>Publicity Expenses</h2>
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <h3 style={{ width: "60%", color: "grey" }}>Description</h3>
//               <hr></hr>
//               <h3 style={{ color: "grey" }}>Amount (N)</h3>
//             </div>
//             <hr />
//             {publicityExpenses?.map((item) => (
//               <div key={item?.id} className="pdf-income-item">
//                 <h3>{item?.desc}</h3>
//                 <p>{item?.amount}</p>
//               </div>
//             ))}
//           </section>
//         )}

//         <div className="document-total-income">
//           <h2>Total Expenses:</h2>
//           <h2 className="document-total-income-amount">{totalExpenses}</h2>
//         </div>

//         <div>
//           <h2>Summary</h2>
//           <ul>
//             <li>
//               <strong>Total Income:</strong> {totalIncome}
//             </li>
//             <li>
//               <strong>Total Expenses:</strong> {totalExpenses}
//             </li>
//             <li>
//               <strong>Net Balance:</strong> {totalBalance}
//             </li>
//           </ul>

//           <div className="signature-container">
//             <h2>{form.name}</h2>
//           </div>
//         </div>
//       </section>

//       <button onClick={downloadPdf} className="pdf-download-btn">
//         Download PDF
//       </button>
//     </main>
//   );
// }

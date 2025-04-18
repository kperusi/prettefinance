// import React, { useRef, useState, useEffect } from "react";
// // import { jsPDF } from "jspdf";
// // import html2canvas from "html2canvas";
// import "./pdfstyle.css";
// import { useNavigate } from "react-router-dom";
// export default function PdfGenerator2({
//   incomes,
//   form,
//   expenses,
//   departmentExpenses,
//   totalIncome,
//   totalExpenses,
//   totalBalance,
//   setDisplay,
//   handleSetDisplay,
// }) {
//   const contentRef = useRef(); // Reference for the content to be captured
//   const incomeRef = useRef(); // Reference for the income
//   const expensesPage2Ref = useRef();
//   const [pages, setPages] = useState();

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
//   const downloadPdf = () => {
//     generatePDF();
//   };

//   // console.log(departmentExpenses.length);

//   return (
//     <main className="document">
//       <section>
//         <span onClick={() => handleSetDisplay()}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             height="24px"
//             viewBox="0 -960 960 960"
//             width="24px"
//             fill="#white"
//           >
//             <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" />
//           </svg>
//         </span>
//       </section>

//       <section
//         ref={contentRef}
//         className=" main bg-white p-4 border rounded shadow-md"
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

//         {departmentExpenses?.map((each, i) => (
//           <div key={i} className="section-cx">
//             {each.name}
//             {each.items.map((each, i) => (
//               <div key={i} className="pdf-income-item">
//                 <h3> {each.incomeSource || each.desc}</h3>
//                 <p>{each.amount}</p>
//               </div>
//             ))}
//           </div>
//         ))}
//       </section>

//       <section>
//         <button onClick={downloadPdf} className="pdf-download-btn">
//           Download PDF
//         </button>
//       </section>
//     </main>
//   );
// }

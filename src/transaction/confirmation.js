import React from "react";
import img1 from "../images/icon-complete.svg";
import './transactionstyle/transactionstyles.css'
function Confirmation(props) {
  return (
    <main className="confirmation">
      {/* <section className="confirmation-content-cx"> */}
        {" "}
        <img src={img1} alt="imagelogo" />
        <div>
          <h1 className="thanks" style={{ textAlign: "center" }}>
            THANK YOU!
          </h1>
          <p className="para" style={{ textAlign: "center" }}>
            We've added your transaction details
          </p>
        </div>
        <button
          className="continue-button"
          style={{}}
          onClick={props.handleShowConfirmation}
        >
          Continue
        </button>
      {/* </section> */}
    </main>
  );
}
export default Confirmation;

import React from "react";
import "./homepagestyle/homepagestylel.css";
import { useNavigate } from "react-router-dom";
export default function Home() {
  let toggle = JSON.parse(localStorage.getItem("toggle"));
  console.log(toggle);
  const navigate = useNavigate()
  return (
    <main className="home-main">
      <section className="hero">
        <h1>EBCFinance</h1>
        <p>Welcome to our homepage!</p>
      </section>

      <section className="hero-para">
        <h1> Easy Control of Our Financial Record</h1>
        <p>
          Easy way to maintain the finance of EBC through digital technology.
          While getting reports at ease
        </p>
      </section>

      <section className="img-cx"></section>

      <section className="home-btn-cx">
        <button className="home-btn" onClick={()=>navigate('/ebcfinance-login')} type="button">
          Get Started
        </button>
      </section>
    </main>
  );
}






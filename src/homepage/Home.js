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
        <h1>Prettifinance</h1>
        <p>Welcome to our homepage!</p>
      </section>

      <section className="hero-para">
        <h1> Easy Control of Your Financial Record</h1>
        <p>
          Monitor your Finance right on your palm.Add transaction EASILY and get your report ready
        </p>
      </section>

      <section className="img-cx"></section>

      <section className="home-btn-cx">
        <button className="project-acct-btn" onClick={()=>navigate('/ebcfinance-login')} type="button">
         Get Started
        </button>
       
      </section>
    </main>
  );
}






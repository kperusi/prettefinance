import React from "react";
import Navbar from "../nav/Navbar";
import { Outlet } from "react-router-dom";
import "./pagesstyles/pagesstyle.css";
export default function Page({select,setSelect}) {
  return (
    <main className="page-main">
   
      <section className="navbar-cx">
        <Navbar select={select} setSelect={setSelect}  />
      </section>


      <section className="content-cx">
        <Outlet />
      </section>
    </main>
  );
}

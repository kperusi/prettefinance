import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { handleSelectAccount } from '../store/storeSlice';
export default function WelcomePage() {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const account_type = useSelector((state)=>state.sliceData.account_type)

console.log(account_type)
const handleMainBottonClick=()=>{
navigate('/prettifinance/account/main')
dispatch(handleSelectAccount('Main account'))
}
const handleProjectBottonClick=()=>{
navigate('/prettifinance/account/main')
dispatch(handleSelectAccount('Project account'))
}
  return (
    <main>
      <h1>Select Account</h1>
      <section className="home-btn-cx">
        <button className="project-acct-btn"onClick={handleProjectBottonClick} type="button">
          Project Account
        </button>
         <button className="main-acct-btn" onClick={handleMainBottonClick} type="button">
          Main Account
        </button>
      </section>

    </main>
  )
}

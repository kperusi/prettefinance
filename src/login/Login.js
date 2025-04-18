import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";


import {
  arrayUnion,
  collection,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  setDoc,
  Timestamp,
  where,
  getDoc,
} from "firebase/firestore";

import "./styles/loginstyles.css";
// import { connectStorageEmulator } from "firebase/storage";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorColor, setErrorColor] = useState("");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password)
        .then(() => {
          localStorage.setItem(
            "ebcfinance-user",
            JSON.stringify(auth.currentUser)
          );
          // navigate("/ebcfinance/views");
          setErrorColor('green')
          setLoading(false);
          setError("Login Successful");
          setTimeout(()=>{
            navigate("/ebcfinance/views");
          },1000)
          
        })
        .catch((e) => {
          if (e.message.split(" ")[2].includes("invalid")) {
            setErrorColor('red')
            setError("Please Check Your Email or Password");

          } else if (e.message.split(" ")[2].includes("network")) {
            setErrorColor('red')
            setError("Check Your Network Connection");
          }

          setLoading(false);
          // popup(e.code)
        });
    } catch (error) {
      console.log(error.message);
    }

  try {
      const loginUserDetailsRef = collection(db, "users");
      const q = query(loginUserDetailsRef);
      onSnapshot(q, (snapshot) => {
        const loginUsersDetails = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // setLoading(false);
        console.log(loginUsersDetails);

        const fetchLoginUser = loginUsersDetails.find(
          (_user) => _user?.id === auth.currentUser?.uid
        );

        if (fetchLoginUser) {
          localStorage.setItem(
            "loginUserDetails",
            JSON.stringify(fetchLoginUser)
          );
        }

        // setLoginUserDetail(fetchLoginUser);
      });
    } catch (error) {
      setError(error);
    }




  };

  const handleVisibilityChange = (e) => {
    e.preventDefault();

    if (visible) {
      setVisible(false);
    } else if (!visible) {
      setVisible(true);
    }
  };

  console.log(visible);

  return (
    <main className="login-main">
      <section className="hero">
        <h1>AuditoR</h1>
        <p>Login</p>
      </section>

      <div className="register-cx">
        <form
          className="register-form"
          onSubmit={(e) => {
            handleLogin(e);
          }}
        >
          <div className="email-cx">
          <label>Email:</label>
            <div className="email-icon-cx">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
              </svg>
              <input
              style={{width: '95%',border:'none'}}
              className="email"
              onChange={(e) => handleChange(e)}
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            </div>
            
        
          </div>

          <div className="password-cx">
            <label>Password:</label>
            <div className="password-icon-cx">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
              </svg>
              <input
                style={{ width: "90%", border: "none" }}
                onChange={(e) => handleChange(e)}
                className="password"
                type={visible ? "text" : "password" }
                name="password"
                placeholder="Password"
                required
              />
              <button
                onClick={(e) => handleVisibilityChange(e)}
                className="visible-btn"
              >
                {!visible && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                    className="visible-open"
                  >
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                  </svg>
                )}

                {visible && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                    className="visible-lock"
                  >
                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="error-x" style={{ marginTop: "-10px" }}>
            <p className={`error `} style={{color:errorColor}}>{error}</p>
          </div>
          <section className="login-section-rw-2">
            {loading && (
              <div className="login-loading">
                <span></span>
              </div>
            )}
          </section>

          <input className="form-btn" type="submit" value="Login" />
        </form>
        <p className="register-text">
          Not Yet Registered? <a href="/ebcfinance-register">Register</a>
        </p>
      </div>
    </main>
  );
}

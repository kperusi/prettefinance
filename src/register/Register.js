import React, { useState } from "react";
import "./registerstyles/registerstyle.css";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { collection, doc, setDoc, Timestamp,updateDoc } from "firebase/firestore";
export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    console.log(form);
    // if (password !== conPassword) {
    //   setValidConPass(true);
    //   return;
    // }
    setLoading(true);
    // setConPassword(false);

    try {
      await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      ).then(async (userDetails) => {
        await updateProfile(userDetails.user, {
          displayName: form.username,
          //  photoURL:`https://gravatar.com/avatar${md5(userDetails.user.email)}?d=identicon`
        });

       
      });

      await setDoc(doc(db, "users",auth.currentUser.uid), {
        email: auth.currentUser.email,
        role: "regular"
      });
      console.log(auth.currentUser.uid)
      console.log("user created successfully");
      navigate("/ebcfinance-login");

      localStorage.setItem("ebcfinance-user", JSON.stringify(auth.currentUser));
   
      setLoading(false);
    } catch (error) {
      // console.log(error.message);
      setError(error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="register-main">
      <section className="hero">
        <h1>EBCFinance</h1>
        <p>Register</p>
      </section>

      <div className="register-cx">
        <form
          className="register-form"
          onSubmit={(e) => {
            handleSignIn(e);
          }}
        >
          <div className="name-cx">
            <label>Username:</label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className="name"
              type="text"
              name="username"
              required
            />
          </div>

          <div className="email-cx">
            <label>Email:</label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className="email"
              type="email"
              name="email"
              required
            />
          </div>

          <div className="password-cx">
            <label>Password:</label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className="password"
              type="password"
              name="password"
              required
            />
          </div>
          {loading && <h2>Registering...</h2>}
          {/* {error && <h2>{error}</h2>} */}
          <input className="form-btn" type="submit" value="Register" />
        </form>
        <p className="register-text">
          Already Registered? <a href="/ebcfinance-login">Login</a>
        </p>
      </div>
    </main>
  );
}
